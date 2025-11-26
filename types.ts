export interface MathState {
  number: number;
  perfectSquare: number;
  integerRoot: number;
  remainder: number;
}

export type AIMode = 'explain' | 'quiz' | 'problem' | 'realLife' | null;

export interface AudioConfig {
  sampleRate: number;
}