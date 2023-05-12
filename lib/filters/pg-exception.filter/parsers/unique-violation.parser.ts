const entriesRE = /\(.+\)/;
const bracesRE = /[\(\)]/g;

export const parser = (input: string) => {
  const [left, right] = input.split('=');

  const keyMatch = entriesRE.exec(left);
  const valueMatch = entriesRE.exec(right);

  if (!keyMatch || !valueMatch) return '';

  const key = keyMatch[0].replace(bracesRE, '');
  const value = valueMatch[0].replace(bracesRE, '');

  return `${key}: ${value} is already taken!`;
};
