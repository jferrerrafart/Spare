export interface iSurvey {
  id: number;
  company_id: number;
  title: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  created_at: Date;
  responses_count: number;
}

export interface iSurvey2 {
  title: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

export interface iResponse {
  survey_id: number;
  selected_option: String;
}

export interface iResults {
  survey_id: number;
  totalResponses: number;
  option_a: number;
  option_b: number;
  option_c: number;
  option_d: number;
}
