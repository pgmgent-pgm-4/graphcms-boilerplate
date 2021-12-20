/*
 * Generate Timestamps
*/
const generateTimestamps = () => {
  return {
    createdAt: Date.now(),
    modifiedAt: null,
    deletedAt: null,
  }
};

/*
* Generate Integer between min and max
*/
const generateValueBetweenMinAndMax = (min, max) => {
  return min + Math.round(Math.random()*(max - min));
}

export {
  generateTimestamps,
  generateValueBetweenMinAndMax,
};
