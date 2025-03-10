import express from "express";
import cors from "cors";
import morgan from "morgan";

import {
  getUserDataController, //sin usar
  getAvailableSurveysController, //sin usar
  getCompleteSurveyController, //sin usar
  postAnswerController, //sin usar
  getUserRewardsController, //sin usar
  getNumberCompletedSurveysController,
} from "./Controllers/userControllers.ts";

import {
  getSurveyDataController, // Check this one
  postCreateSurveyController, // Company creates a survey.
  getCreatedSurveysController, // Company gets the number of surveys they have created (check if its general or only thhe company)
  postSurveyResultsController, //User sends response of a Survey, should be in users controller file
  getSurveybyIDController, // Company & User get the question and possible answers from a Survey
  getSurveyResultsController, //Company gets results of a Survey
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
app.get("/user/howmanycompletedsurveys/1", getNumberCompletedSurveysController); //para deshardcodear camio el 1 por :user_id

//Company Endpoints
app.get("/company/1", getSurveyDataController); //hardcoded "/company/{id}"
app.post("/company/1/survey", postCreateSurveyController); //hardcoded "/company/{id}/survey"
app.get("/company/1/surveys", getCreatedSurveysController); //hardcoded "/company/{id}/surveys"
app.get("/company/1/survey/:survey_id", getSurveybyIDController);
app.post(
  "/company/1/survey/:survey_id/postresults",
  postSurveyResultsController
); //hardcoded "/company/{id}/survey/{survey_id}/results"
app.get("/company/1/survey/getresults/:survey_id", getSurveyResultsController);

export default app;
