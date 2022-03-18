const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;

    callback(error, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let inputURL = 'https://freegeoip.app/json/' + ip;

  request(inputURL, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg, null));
    }

    const data = JSON.parse(body);
    const add = { latitude: data.latitude, longitude: data.longitude };
    
    callback(error, add);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let inputURL = 'https://iss-pass.herokuapp.com/json/?lat=' + coords.latitude + '&lon=' + coords.longitude;

  request(inputURL, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg, null));
    }

    const data = JSON.parse(body).response;

    callback(error, data);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
  
    fetchCoordsByIP(ip, (error, addr) => {
      if (error) return callback(error, null);

      fetchISSFlyOverTimes(addr, (error, times) => {
        if (error) return callback(error, null);

        callback(error, times);
      });
    });
  
  });

};


module.exports = { nextISSTimesForMyLocation };