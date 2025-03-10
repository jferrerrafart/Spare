import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const UserModel = {
  async getUserData() {
    //const responses = await prisma.response.findMany();
    //aqui va la funcion que nos creará la data que queremos obtener
    //puedo sacar info de varias tablas como responses por ej
    //(si es que es necesario vaya)
    //llamo aqui dentro la funcion que he creado para obtener el dato
    //y al final hago un return del dato que será un objeto
  },
  async getAvailableSurveys() {},
  async getCompleteSurvey() {},
  async postAnswer() {},
  async getUserRewards() {},
  async getNumberCompletedSurveys(user_id: number) {
    const count = await prisma.response.count({
      where: {
        user_id: user_id,
      },
    });

    const howManyResponses = {
      numberResponses: count, //countCompanySurveys(surveys),
      //los otros parámetros que quiera
    };
    return howManyResponses;
  },
};
export default UserModel;
