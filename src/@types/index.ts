export interface IQuestion {
  text?: string;
  code?: string;
  correct: number;
  topic?: string;
  options: string[];
}
export interface ITopic {
  [word: string]: number;
}

export interface IResults {
  result: string;
  topics: IResultTopic[];
}

export interface IResultTopic {
  title: string;
  links: string[];
}
