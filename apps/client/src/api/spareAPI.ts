import { string } from "zod";
import { iSurvey2 } from "types/types";
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
};

export default spareAPI;
