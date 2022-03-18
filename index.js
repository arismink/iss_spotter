const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(times) {
  for (let time of times) {
    let d = new Date(time.risetime * 1000).toDateString();

    let t = new Date(time.risetime * 1000).toTimeString();

    console.log(`Next pass at ${d} ${t} for ${time.duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
