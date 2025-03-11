import express from "express";
import cors from "cors";
import morgan from "morgan";

import {
  postSurveyResultsController, //User sends response of a Survey, should be in users controller file
  getNumberCompletedSurveysController,
  postRegisterWalletUserController,
  getFindWalletUController,
  getAllSurveysController, // Check this one
} from "./Controllers/userControllers.ts";

import {
  postCreateSurveyController, // Company creates a survey.
  getCreatedSurveysController, // Company gets the number of surveys they have created (check if its general or only thhe company)
  getSurveybyIDController, // Company & User get the question and possible answers from a Survey
  getSurveyResultsController, //Company gets results of a Survey
  postRegisterWalletCompanyController,
  getFindWalletCController,
  getCompanySurveysController,
} from "./Controllers/companyControllers.ts";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//User Endpoints
app.post("/postresults", postSurveyResultsController);
app.get(
  "/howmanycompletedsurveys/:user_id",
  getNumberCompletedSurveysController
);
app.post("/registerwalletu", postRegisterWalletUserController);
app.get("/findwalletu/:wallet", getFindWalletUController);
app.get("/getAllSurveys", getAllSurveysController);

//Company Endpoints

app.get("/companysurveys/:company_id", getCompanySurveysController);
app.post("/createsurvey", postCreateSurveyController);
app.get("/surveys/:company_id", getCreatedSurveysController);
app.get("/survey/:survey_id", getSurveybyIDController);

app.get("/getresults/:survey_id", getSurveyResultsController);
app.post("/registerwalletc", postRegisterWalletCompanyController);
app.get("/findwalletc/:wallet", getFindWalletCController);

export default app;
