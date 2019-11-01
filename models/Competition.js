const Competition = class {
    constructor(competition, matches, standings) {
        this.competition = competition;

        matches.competition = undefined;
        standings.competition = undefined;

        matches.items = matches.matches;
        matches.matches = undefined;

        standings.items = standings.standings;
        standings.standings = undefined;

        this.competition.matches = matches;
        this.competition.standings = standings;

        this.competition.statistics = {
            matches : {},
            standings: {}
        };

        const statistics = createMatchesStatistics(matches.items, matches.count);

        this.competition.statistics.matches.meanScorePerGame = statistics.meanScorePerGame
        this.competition.statistics.matches.percentageOfWinsByHomeTeam = statistics.percentageOfWinsByHomeTeam;
        this.competition.statistics.matches.teamsScores = statistics.teamsScores;
        this.competition.statistics.matches.teamsWithMaxScore = statistics.teamsWithMaxScore;
        this.competition.statistics.matches.teamsWithMinScore = statistics.teamsWithMinScore;
    }
};

const createMatchesStatistics = (matchesItems, count) => {

    let sumOfScores = 0;

    let sumOfWinsByHomeTeam = 0;

    let teamsScores = {};

    matchesItems.forEach(mi => {

        sumOfScores += mi.score.fullTime.homeTeam + mi.score.fullTime.awayTeam;

        if (mi.score.winner === 'HOME_TEAM') {
            sumOfWinsByHomeTeam += 1;
        }

        if (!teamsScores[mi.homeTeam.id]) {
            teamsScores[mi.homeTeam.id] = {
                name: mi.homeTeam.name,
                totalScore: mi.score.fullTime.homeTeam
            }
        } else {
            teamsScores[mi.homeTeam.id].totalScore += mi.score.fullTime.homeTeam;
        }

        if (!teamsScores[mi.awayTeam.id]) {
            teamsScores[mi.awayTeam.id] = {
                name: mi.awayTeam.name,
                totalScore: mi.score.fullTime.awayTeam
            }
        } else {
            teamsScores[mi.awayTeam.id].totalScore += mi.score.fullTime.awayTeam;
        }
    });

    let sortedTeamsScores = Object.entries(teamsScores).sort((a, b) => {
        if (a[1].totalScore < b[1].totalScore) {
            return 1;
        }

        if (a[1].totalScore > b[1].totalScore) {
            return -1;
        }

        return 0;
    });

    const maxScore = sortedTeamsScores[0][1].totalScore;
    const minScore = sortedTeamsScores[sortedTeamsScores.length-1][1].totalScore;
    let maxScoreTeams = [];
    let minScoreTeams = [];
    sortedTeamsScores.forEach(ts => {
        if (ts[1].totalScore === maxScore) { 
           maxScoreTeams.push(ts[1]);
        }

        if (ts[1].totalScore === minScore) {
            minScoreTeams.push(ts[1]);
        }
    });

    return {
        meanScorePerGame: (sumOfScores/count).toFixed(1),
        percentageOfWinsByHomeTeam: (sumOfWinsByHomeTeam/count).toFixed(2) * 100,
        teamsScores: teamsScores,
        teamsWithMaxScore: maxScoreTeams,
        teamsWithMinScore: minScoreTeams 
    }; 

}

module.exports = Competition;