import UserModel from "../Models/userModel.ts";
import { Request, Response } from "express";

//Ojo, no se si todas son async eh, en el wallet no todas lo eran

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
