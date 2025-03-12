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
import consensyslogo from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/src/utils/consensyslogo.jpg";
import React from "react";
import { iSurvey } from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/types/types.ts";

interface DashboardProps {
  companyId: number | null;
}

const Dashboard: React.FC<DashboardProps> = ({ companyId }) => {
  //function Dashboard() {
  const [countSurveys, setCountSurveys] = useState(0);
  console.log(companyId);
  const [surveyList, setSurveyList] = useState<iSurvey[]>([]);
  async function fetchData() {
    const count = await spareAPI.getCreatedSurveys(Number(companyId));
    setCountSurveys(count.companySurveys);
  }
  async function fetchData2() {
    const surveys = await spareAPI.getCompanySurveys(Number(companyId));
    setSurveyList(surveys.surveys as iSurvey[]);
  }

  /*useEffect(() => {
    setInterval(() => {
      fetchData();
      fetchData2();
    }, 1000);
  }, []);*/

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      fetchData2();
    }, 1000);
    return () => clearInterval(interval);
  }, [companyId]);

  return (
    <>
      <div className="px-27 py-10">
        <Card className="bg-emerald-100">
          <CardContent>
            {/* Contenedor flex con mayor espaciado entre los elementos */}
            <div className="flex items-center justify-between space-x-3 px-4 py-2">
              {/* Sección izquierda (Avatar y Username) */}
              <div className="flex flex-col items-center space-y-2 ml-10">
                <Avatar className="w-25 h-25">
                  <AvatarImage src={consensyslogo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-medium">Consensys</p>
              </div>
              <div className="max-w-4xl mx-auto ">
                <Card className="bg-emerald-600 text-white font-bold p-6">
                  <CardContent>
                    <p>Surveys created: {countSurveys}</p>
                    <p>Total responses obtained: </p>
                    <p>Surveys created: </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col space-y-4 w-40">
                <Link to="/create-survey">
                  <Button className="w-full bg-emerald-600">
                    Create New Survey
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
                Current participants
              </TableHead>
              <TableHead className="text-center">Leading response</TableHead>
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
                      <Link to={`/survey-results/${currentSurvey.id}`}>
                        <Button className="bg-emerald-600 px-2 py-1 text-xs">
                          See results
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
};

export default Dashboard;
