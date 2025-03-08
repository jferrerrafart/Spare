import { PrismaClient } from "@prisma/client";
import { iSurvey } from "../../types/types";

const prisma = new PrismaClient();
const CompanyModel = {
  async getCompanyData() {
    //const surveys = await prisma.survey.findMany(); //count()
    //Ahora de primeras vamos a hacer que nos dé el num de
    //surveys creadas por la compañía solo
    //function countCompanySurveys(surveys: Array<iSurvey>) {
    //aqui tengo que buscar segun el company ID a lo mejor
    //hay que pasarlo tambien...
    //}
    const surveys = await prisma.survey.count();
    const stats = {
      companySurveys: surveys, //countCompanySurveys(surveys),
      //los otros parámetros que quiera
    };
    return stats;
  },
  async postCreateSurvey(survey: iSurvey) {
    return await prisma.survey.create({ data: survey });
  },
  async getCreatedSurveys() {
    const surveys = await prisma.survey.count();
    const howManySurveys = {
      companySurveys: surveys, //countCompanySurveys(surveys),
      //los otros parámetros que quiera
    };
    return howManySurveys;
  },
  async getSurveyResults() {},
};
export default CompanyModel;
