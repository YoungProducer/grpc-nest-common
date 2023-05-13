import { HttpStatus } from '@nestjs/common';
import { parser as uvparser } from './unique-violation.parser';

export interface PGParserReturn {
  httpStatus: HttpStatus;
  error: string;
}

export type PGParser = (input: string) => PGParserReturn;

export const parsers = new Map<string, PGParser>();
parsers.set('23505', uvparser);
