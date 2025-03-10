export interface iSurvey {
  company_id: number;
  title: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}
export interface iResponse {
  user_id: number;
  survey_id: number;
  selected_option: string;
}
