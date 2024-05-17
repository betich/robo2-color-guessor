export function timeToScore(
  time: number,
  penalty: number,
  baseScore: number = 300,
) {
  // map time to score, the less the time, the better the score

  return Math.max(baseScore - time - penalty, 0) * 50;
}
