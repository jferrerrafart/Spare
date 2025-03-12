import { PrismaClient } from "@prisma/client";
import { iRegisterU, iResponse } from "../../types/types";
const prisma = new PrismaClient();
const UserModel = {
  async getAllSurveys() {
    const surveys = await prisma.survey.findMany();
    const stats = {
      surveys: surveys,
    };
    return stats;
  },
  async postSurveyResults(surveyResults: iResponse) {
    //return await prisma.response.create({ data: surveyResults });
    await prisma.$transaction([
      prisma.response.create({
        data: surveyResults,
      }),
      prisma.survey.update({
        where: { id: surveyResults.survey_id },
        data: { responses_count: { increment: 1 } },
      }),
    ]);
  },
  async getNumberCompletedSurveys(user_id: number) {
    const count = await prisma.response.count({
      where: {
        user_id: user_id,
      },
    });

    const howManyResponses = {
      numberResponses: count,
    };
    return howManyResponses;
  },
  async postRegisterWalletU(newRegister: iRegisterU) {
    return await prisma.user.create({ data: newRegister });
  },
  async getFindWalletU(wallet: string) {
    return await prisma.user.findUnique({
      where: { wallet: wallet },
    });
  },
  async getSCompletionCheck(user_id: number, survey_id: number) {
    return await prisma.response.findFirst({
      where: {
        user_id: user_id,
        survey_id: survey_id,
      },
    });
  },
};
export default UserModel;
