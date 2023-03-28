const colors = [
  '#e0b0ff',
  '#ffff99',
  '#b8b8ff',
  '#b2d4ff',
  '#9ac0c0',
  '#ffb6d2',
  '#d1ffd1',
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
