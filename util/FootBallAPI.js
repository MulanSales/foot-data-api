const axios = require('axios');

const FootBallAPI = class {

    /**
    * Get resource from FootBall API
    * @param {[String]} params 
    */
    static async getResource(params) {
        let resource = `${process.env.FOOTBALL_DATA_ADDRESS}`;
        params.forEach(param => {
            resource = resource.concat('/', param);        
        });
  
        try {
            return axios.default(resource, {
                method: "GET",
                headers: {
                    "X-Auth-Token": process.env.FOOTBALL_DATA_KEY
                }
            })
            .then(result => {
                return result.data;
            })
        } catch(err) {
            return err;
        }

    }

}

module.exports = FootBallAPI;