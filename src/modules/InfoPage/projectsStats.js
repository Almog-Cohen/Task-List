export function calculateAvgScore(projects) {
  const scoreSum = projects.reduce((sum, current) => (sum += current.score), 0);
  return projects.length != 0 ? (scoreSum / projects.length).toFixed(2) : 0;
}

export function calculatePercentageOfMadeDeadline(projects) {
  const countOfProjectsThatMadeDeadline = projects.filter(
    (row) => row.madeDadeline
  );

  return projects.length != 0
    ? (
        (countOfProjectsThatMadeDeadline.length / projects.length) *
        100
      ).toFixed(2)
    : 0;
}
