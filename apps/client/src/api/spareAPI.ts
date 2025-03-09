import { string } from "zod";

const spareAPI = {
  async getCreatedSurveys() {
    const response = await fetch(`http://localhost:8080/company/1/surveys`);
    const data = await response.json();
    return data;
  },
  async postCreateSurvey() {
    const response = await fetch(`http://localhost:8080/company/1/survey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "1": string,
        title: string,
        question: string,
        option_a: string,
        option_b: string,
        option_c: string,
        option_d: string,
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating survey");
    }
    return response.json();
  },
};

export default spareAPI;
