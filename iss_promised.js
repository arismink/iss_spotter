const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ipBody) {
  const ip = JSON.parse(ipBody).ip;

  return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);

  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);

}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => {
    const { response } = JSON.parse(body);
    return response;
  });
}

module.exports = { nextISSTimesForMyLocation };