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

import spareAPI from "@/api/spareAPI";
import moment from "moment";

import { iSurvey } from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/types/types.ts";

function UserDashboard() {
  const [countSurveys, setCountSurveys] = useState(0);
  const [surveyList, setSurveyList] = useState<iSurvey[]>([]);
  async function fetchData() {
    const count = await spareAPI.getCreatedSurveys();
    setCountSurveys(count.companySurveys);
  }
  async function fetchData2() {
    const surveys = await spareAPI.getSurveyData();
    setSurveyList(surveys.surveys as iSurvey[]);
  }

  useEffect(() => {
    setInterval(() => {
      fetchData();
      fetchData2();
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex justify-center space-x-30 mt-6 px-4 py-20">
        <p className="font-medium">Username</p>
        <div>
          <p>Current rewards:</p>
          <p>Surveys completed:</p>
          <p>Daily strike bonus:</p>
          <p>Survey completion bonus:</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/">
            <Button className="w-full">Daily Strike</Button>
          </Link>
          <Link to="/">
            <Button className="w-full">Withdraw rewards</Button>
          </Link>
        </div>
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
            {surveyList.map((currentSurvey) => {
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
                      <Button className="px-2 py-1 text-xs">
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
