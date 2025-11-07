
export interface QuizQuestion {
  word: string;
  definition: string;
}

export enum GameState {
  Initial,
  Loading,
  Playing,
  Finished,
}

export enum FeedbackType {
    None,
    Correct,
    Incorrect
}

export interface Feedback {
    type: FeedbackType;
    message: string;
}
