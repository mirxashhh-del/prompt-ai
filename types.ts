export interface PromptRequest {
  userInput: string;
}

export interface PromptResponse {
  enhancedPrompt: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
