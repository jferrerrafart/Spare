import { PrismaClient } from "@prisma/client";
import { iResponse, iSurvey } from "../../types/types";

const prisma = new PrismaClient();
const CompanyModel = {
  async getSurveyData() {
    //const surveys = await prisma.survey.findMany(); //count()
    //Ahora de primeras vamos a hacer que nos dé el num de
    //surveys creadas por la compañía solo
    //function countCompanySurveys(surveys: Array<iSurvey>) {
    //aqui tengo que buscar segun el company ID a lo mejor
    //hay que pasarlo tambien...
    //}
    const surveys = await prisma.survey.findMany();
    const stats = {
      surveys: surveys,
    };
    return stats;
  },
  async getSurveybyID(id: number) {
    return await prisma.survey.findUnique({
      where: { id: id },
    });
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
  async postSurveyResults(surveyResults: iResponse) {
    return await prisma.response.create({ data: surveyResults });
  },
  async getSurveyResults(survey_id: number) {
    const totalResponses = await prisma.response.count({
      where: { survey_id },
    });

    if (totalResponses === 0) {
      return {
        survey_id,
        totalResponses,
        option_a: 0,
        option_b: 0,
        option_c: 0,
        option_d: 0,
      };
    }

    const optionCounts = await prisma.response.groupBy({
      by: ["selected_option"],
      where: { survey_id },
      _count: { selected_option: true },
    });

    // Inicializar los resultados en 0 para todas las opciones
    const results = {
      survey_id,
      totalResponses,
      option_a: 0,
      option_b: 0,
      option_c: 0,
      option_d: 0,
    };

    // Asignar los valores reales según las respuestas
    optionCounts.forEach((option) => {
      if (option.selected_option in results) {
        results[option.selected_option as keyof typeof results] = Math.round(
          (option._count.selected_option / totalResponses) * 100
        );
      }
    });

    return results;
  },
};
export default CompanyModel;
