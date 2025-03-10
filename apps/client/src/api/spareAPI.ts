import { string } from "zod";
import { iResponse, iSurvey2 } from "types/types";
const spareAPI = {
  async getCreatedSurveys() {
    const response = await fetch(`http://localhost:8080/company/1/surveys`);
    const data = await response.json();
    return data;
  },
  async getSurveyData() {
    const response = await fetch(`http://localhost:8080/company/1`);
    const data = await response.json();
    return data;
  },
  async getSurveybyID(id: number) {
    const response = await fetch(
      `http://localhost:8080/company/1/survey/${id}`
    );
    const data = await response.json();
    return data;
  },
  async postCreateResponse(surveyResponse: iResponse) {
    const response = await fetch(
      `http://localhost:8080/company/1/survey/${surveyResponse.survey_id}/postresults`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          ...surveyResponse,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error creating survey response");
    }
    return response.json();
  },

  async postCreateSurvey(survey: iSurvey2) {
    const response = await fetch(`http://localhost:8080/company/1/survey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_id: 1,
        ...survey,
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating survey");
    }
    return response.json();
  },
  async getSurveyResults(survey_id: number) {
    const response = await fetch(
      `http://localhost:8080/company/1/survey/getresults/${survey_id}`
    );
    const data = await response.json();
    return data;
  },
  async getNumberResponses(user_id: number) {
    const response = await fetch(
      `http://localhost:8080/user/howmanycompletedsurveys/${user_id}`
    );
    const data = await response.json();
    return data;
  },
};

export default spareAPI;
