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
  try {
    const { user_id } = req.params;
    const data = await UserModel.getNumberCompletedSurveys(Number(user_id)); //Number(user_id)
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching number of completed surveys:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
