export type NumberType = 'trivia' | ' year' | 'date' | 'math';

export interface NumberDto {
  number: number;
  text: string;
  type: NumberType;
  found: boolean;
  year?: number;
  date?: number;
}

export interface State {
  type: NumberType;
  number: string | number;
  isRandom: boolean;
}
