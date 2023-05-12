import { parser as uvparser } from './unique-violation.parser';

export type PGParser = (input: string) => string;

export const parsers = new Map<string, PGParser>();
parsers.set('23505', uvparser);
