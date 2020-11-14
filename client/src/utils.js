export const getUserPersonality = answers => { 
    const counts = {};
    let maxKey = null;
    let maxVal = 0;
    // answers is a list of numbers [0, 0, 1, 0, 2]
    answers.forEach(i => {
      i = parseInt(i);
      // update the counts of this answer
      if (i in counts) counts[i] += 1;
      else counts[i] = 1;
      // check to see if the count of i is greater than the current max count
      if (counts[i] > maxVal) {
        maxVal = counts[i];
        maxKey = i;
      }
    })

    return maxKey;
}