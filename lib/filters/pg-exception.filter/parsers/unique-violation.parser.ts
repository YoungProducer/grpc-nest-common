import { HttpStatus } from '@nestjs/common';
import { PGParser } from '.';

const entriesRE = /\(.+\)/;
const bracesRE = /[\(\)]/g;

export const parser: PGParser = (input) => {
  const [left, right] = input.split('=');

  const keyMatch = entriesRE.exec(left);
  const valueMatch = entriesRE.exec(right);

  if (!keyMatch || !valueMatch) {
    throw new Error('Invalid pg error!');
  }

  const key = keyMatch[0].replace(bracesRE, '');
  const value = valueMatch[0].replace(bracesRE, '');

  const error = `${key}: ${value} is already taken!`;

  return {
    httpStatus: HttpStatus.CONFLICT,
    error,
  };
};
