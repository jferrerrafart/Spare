import { iRegisterU, iResponse } from "../../types/types.ts";
import UserModel from "../Models/userModel.ts";
import { Request, Response } from "express";

export async function getAllSurveysController(_req: Request, res: Response) {
  const data = await UserModel.getAllSurveys();
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
  UserModel.postSurveyResults(newResponse);

  res.status(201).json({ message: "New survey created" });
}

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
export async function postRegisterWalletUserController(
  req: Request<{}, {}, iRegisterU>,
  res: Response
) {
  const { wallet, username } = req.body;
  const newRegister: iRegisterU = {
    wallet,
    username,
  };
  UserModel.postRegisterWalletU(newRegister);
}
export async function getFindWalletUController(req: Request, res: Response) {
  const { wallet } = req.params;
  const found = await UserModel.getFindWalletU(wallet);
  res.status(200).json(found);
}
