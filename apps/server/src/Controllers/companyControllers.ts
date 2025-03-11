import CompanyModel from "../Models/companyModel.ts";
import { Request, Response } from "express";
import { iResponse, iSurvey, iRegisterW } from "../../types/types";

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
export async function getCreatedSurveysController(req: Request, res: Response) {
  const { company_id } = req.params;
  const data = await CompanyModel.getCreatedSurveys(Number(company_id));
  res.status(200).json(data);
}

export async function postRegisterWalletCompanyController(
  req: Request<{}, {}, iRegisterW>,
  res: Response
) {
  const { wallet, name } = req.body;
  const newRegister: iRegisterW = {
    wallet,
    name,
  };
  CompanyModel.postRegisterWalletC(newRegister);
}

export async function getSurveyResultsController(req: Request, res: Response) {
  const { survey_id } = req.params;
  const data = await CompanyModel.getSurveyResults(Number(survey_id));
  res.status(200).json(data);
}

export async function getFindWalletCController(req: Request, res: Response) {
  console.log("im here");
  console.log(CompanyModel);
  const { wallet } = req.params;
  const found = await CompanyModel.getFindWalletC(wallet);
  res.status(200).json(found);
}

export async function getCompanySurveysController(req: Request, res: Response) {
  const { company_id } = req.params;
  const data = await CompanyModel.getCompanySurveys(Number(company_id));
  res.status(200).json(data);
}
