import express from "express";
import cors from "cors";
import morgan from "morgan";

import {
  getUserDataController,
  getAvailableSurveysController,
  getCompleteSurveyController,
  postAnswerController,
  getUserRewardsController,
} from "./Controllers/userControllers.ts";

import {
  getCompanyDataController,
  postCreateSurveyController,
  getCreatedSurveysController,
  getSurveyResultsController,
} from "./Controllers/companyControllers.ts";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//User Endpoints
app.get("/user/1", getUserDataController); //hardcoded "/user/{id}"
app.get("/user/1/surveys", getAvailableSurveysController); //hardcoded "/user/{id}/surveys"
app.get("/user/1/survey/{survey_id}", getCompleteSurveyController); //hardcoded "/user/{id}/survey/{survey_id}"
app.post("/user/1/survey/{survey_id}/answer", postAnswerController); //hardcoded "/user/{id}/survey/{survey_id}/answer"
app.get("/user/1/rewards", getUserRewardsController); // hardcoded "/user/{id}/rewards"

//Company Endpoints
app.get("/company/1", getCompanyDataController); //hardcoded "/company/{id}"
app.post("/company/1/survey", postCreateSurveyController); //hardcoded "/company/{id}/survey"
app.get("/company/1/surveys", getCreatedSurveysController); //hardcoded "/company/{id}/surveys"
app.get("/company/1/survey/{survey_id}/results", getSurveyResultsController); //hardcoded "/company/{id}/survey/{survey_id}/results"

export default app;
