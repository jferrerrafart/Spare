import { string } from "zod";
import { iResponse, iSurvey2 } from "types/types";
const spareAPI = {
  async getCompanySurveys(company_id: number) {
    const response = await fetch(
      `http://localhost:8080/companysurveys/${company_id}`
    );
    const data = await response.json();
    return data;
  },

  async getCreatedSurveys(company_id: number) {
    const response = await fetch(`http://localhost:8080/surveys/${company_id}`);
    const data = await response.json();
    return data;
  },
  async getAllSurveys() {
    const response = await fetch(`http://localhost:8080/getAllSurveys`);
    const data = await response.json();
    return data;
  },
  async getSurveybyID(id: number) {
    const response = await fetch(`http://localhost:8080/survey/${id}`);
    const data = await response.json();
    return data;
  },
  async postCreateResponse(surveyResponse: iResponse) {
    const response = await fetch(`http://localhost:8080/postresults`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        ...surveyResponse,
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating survey response");
    }
    return response.json();
  },

  async postCreateSurvey(survey: iSurvey2) {
    const response = await fetch(`http://localhost:8080/createsurvey`, {
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
      `http://localhost:8080/getresults/${survey_id}`
    );
    const data = await response.json();
    return data;
  },
  async getNumberResponses(user_id: number) {
    const response = await fetch(
      `http://localhost:8080/howmanycompletedsurveys/${user_id}`
    );
    const data = await response.json();
    return data;
  },
  async postRegisterWalletC(wallet: string) {
    const response = await fetch(`http://localhost:8080/registerwalletc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet: wallet,
        name: "defaultname",
      }),
    });
  },
  async postRegisterWalletU(wallet: string) {
    const response = await fetch(`http://localhost:8080/registerwalletu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet: wallet,
        username: "defaultname",
      }),
    });
  },
  async getFindWalletC(wallet: string) {
    const response = await fetch(`http://localhost:8080/findwalletc/${wallet}`);
    const data = await response.json();
    return data;
  },
  async getFindWalletU(wallet: string) {
    const response = await fetch(`http://localhost:8080/findwalletu/${wallet}`);
    const data = await response.json();
    return data;
  },
};

export default spareAPI;
