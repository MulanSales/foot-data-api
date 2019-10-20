
const axios = require('axios');

/**
 * Get resource from FootBall API
 * @param {[String]} params 
 */
const getResource = async (params) => {

    let resource = `${process.env.FOOTBALL_DATA_ADDRESS}`;
    params.forEach(param => {
        resource = resource.concat('/', param);        
    });

    return axios(resource, {
        method: "GET",
        headers: {
            "X-Auth-Token": process.env.FOOTBALL_DATA_KEY
        }
    })
    .then(result => {
        return result.data;
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports = { getResource };