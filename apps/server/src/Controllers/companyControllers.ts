import CompanyModel from "../Models/companyModel.ts";
import { Request, Response } from "express";
import { iResponse, iSurvey } from "../../types/types";

export async function getSurveyDataController(_req: Request, res: Response) {
  const data = await CompanyModel.getSurveyData();
  res.status(200).json(data);
}
export async function getSurveybyIDController(req: Request, res: Response) {
  const { survey_id } = req.params;
  const data = await CompanyModel.getSurveybyID(Number(survey_id));
  res.status(200).json(data);
}
export function postCreateSurveyController(
  req: Request<{}, {}, iSurvey>,
  res: Response
) {
  const {
    company_id,
    title,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
  } = req.body;

  // Ensure correct typing
  const newSurvey: iSurvey = {
    company_id,
    title,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
  };

  // Pass the correctly typed survey object
  CompanyModel.postCreateSurvey(newSurvey);

  res.status(201).json({ message: "New survey created" });
}
export async function getCreatedSurveysController(
  _req: Request,
  res: Response
) {
  const data = await CompanyModel.getCreatedSurveys();
  res.status(200).json(data);
}
export async function postSurveyResultsController(
  req: Request<{}, {}, iResponse>,
  res: Response
) {
  const { user_id, survey_id, selected_option } = req.body;

  // Ensure correct typing
  const newResponse: iResponse = {
    user_id,
    survey_id,
    selected_option,
  };

  // Pass the correctly typed survey object
  CompanyModel.postSurveyResults(newResponse);

  res.status(201).json({ message: "New survey created" });
}
export async function getSurveyResultsController(req: Request, res: Response) {
  const { survey_id } = req.params;
  const data = await CompanyModel.getSurveyResults(Number(survey_id));
  res.status(200).json(data);
}
