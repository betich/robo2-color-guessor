export function timeToScore(time: number, penalty: number) {
  // map time to score, the less the time, the better the score

  const baseScore = 240; // base score

  return Math.max(baseScore - time - penalty, 0) * 50;
}
