import UserModel from "../Models/userModel.ts";
import { Request, Response } from "express";

export async function getUserDataController(_req: Request, res: Response) {
  const data = await UserModel.getUserData();
  res.status(200).json(data);
}
export async function getAvailableSurveysController(
  _req: Request,
  _res: Response
) {}
export async function getCompleteSurveyController(
  _req: Request,
  _res: Response
) {}
export async function postAnswerController(_req: Request, _res: Response) {}
export async function getUserRewardsController(_req: Request, _res: Response) {}

export async function getNumberCompletedSurveysController(
  req: Request,
  res: Response
) {
  const { user_id } = req.params;
  const data = await UserModel.getNumberCompletedSurveys(Number(user_id));
  res.status(200).json(data);
}
