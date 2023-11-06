export function getRandomInt(max) {
  // console.log("max: ", max);
  // const actual = max - 1;
  // if (max === 1) return 1;
  const random = Math.random();
  // console.log("random: ", random);
  return Math.floor(random * max);
}
