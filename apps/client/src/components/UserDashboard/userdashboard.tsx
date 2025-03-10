import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import spareAPI from "@/api/spareAPI";
import moment from "moment";

import { iSurvey } from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/types/types.ts";

function UserDashboard() {
  //const [countSurveys, setCountSurveys] = useState(0);
  const [surveyList, setSurveyList] = useState<iSurvey[]>([]);
  const [numberResp, setNumberResp] = useState(0);
  /*async function fetchData() {
    const count = await spareAPI.getCreatedSurveys();
    setCountSurveys(count.companySurveys);
  }*/
  async function fetchData2() {
    const surveys = await spareAPI.getSurveyData();
    setSurveyList(surveys.surveys as iSurvey[]);
  }
  async function fetchData3() {
    const count = await spareAPI.getNumberResponses(1); // aquí iría el user_id, lo he hardcodeado
    setNumberResp(count.numberResponses);
  }

  useEffect(() => {
    setInterval(() => {
      //fetchData();
      fetchData2();
      fetchData3();
    }, 1000);
  }, []);

  return (
    <>
      <div className="px-27 py-10">
        <Card className="bg-emerald-100">
          <CardContent>
            {/* Contenedor flex con mayor espaciado entre los elementos */}
            <div className="flex items-center justify-between space-x-3 px-4 py-2">
              {/* Sección izquierda (Avatar y Username) */}
              <div className="flex flex-col items-center space-y-2 ml-10">
                <Avatar className="w-27 h-27">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-medium">Username</p>
              </div>

              {/* Sección central (Estadísticas) */}
              <div className="max-w-4xl mx-auto ">
                <Card className="bg-emerald-600 text-white font-bold p-6">
                  <CardContent>
                    <p>Current rewards: {numberResp * 10} points!</p>
                    <p>Surveys completed: {numberResp}</p>
                    <p>Daily strike count:</p>
                    <p>Daily strike bonus:</p>
                    <p>Survey completion bonus:</p>
                  </CardContent>
                </Card>
              </div>

              {/* Sección derecha (Botones) */}
              <div className="flex flex-col space-y-4 w-40">
                <Link to="/">
                  <Button className="w-full bg-emerald-600">
                    Daily Strike
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="w-full bg-emerald-600">
                    Withdraw rewards
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <div className="px-30 py-10">
        <Table className="mt-4">
          <TableCaption>A list of all surveys created</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead className="text-center">Created at</TableHead>
              <TableHead className="text-center">
                Max Participants/completed
              </TableHead>
              <TableHead className="text-center">
                Current Participants
              </TableHead>
              <TableHead className="text-right">Results</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveyList
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((currentSurvey) => {
                return (
                  <TableRow key={currentSurvey.id}>
                    <TableCell className="font-medium text-left">
                      {currentSurvey.title}
                    </TableCell>
                    <TableCell>
                      {moment(currentSurvey.created_at).fromNow()}
                    </TableCell>
                    <TableCell>2000</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-right px-0">
                      <Link to={`/survey-complete/${currentSurvey.id}`}>
                        <Button className="px-2 py-1 text-xs bg-emerald-600">
                          Complete survey
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default UserDashboard;
