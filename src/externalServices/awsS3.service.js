const {default: axios} = require("axios");

let apiAWS;
const baseURLAWS = process.env.NODE_ENV === 'production' ? process.env.AWS_API_URL : process.env.TEST_AWS_API_URL;
function createApiAWS() {
    apiAWS = axios.create({
        baseURL: baseURLAWS,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

function getApiAWS() {
    if (!apiAWS) {
        createApiAWS();
    }
    return apiAWS;
}

module.exports = {
    getApiAWS,
};
