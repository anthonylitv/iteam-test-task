export function parseCoinDenominations(input: string): number[] {
  return input
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n) && n > 0)
    .sort((a, b) => b - a);
}

export function getRandomCoinPreset(): number[] {
  const presets = [
    [1, 5, 10, 25],
    [1, 2, 5],
    [1, 3, 4],
    [1, 7, 10],
  ];
  const index = Math.floor(Math.random() * presets.length);
  return presets[index];
}
