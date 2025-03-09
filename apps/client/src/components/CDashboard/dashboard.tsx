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

function Dashboard() {
  const [countSurveys, setCountSurveys] = useState(0);

  async function fetchData() {
    const count = await spareAPI.getCreatedSurveys();
    setCountSurveys(count.companySurveys);
  }

  useEffect(() => {
    //no es necesario cargar cada segundo solo cuando se aprieta el boton
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex justify-center space-x-30 mt-6 px-4 py-20">
        <p className="font-medium">Company name</p>
        <p>Surveys created: {countSurveys}</p>
        <Link to="/create-survey">
          <Button>Create New Survey</Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="px-30 py-10">
        <Table className="mt-4">
          <TableCaption>A list of all surveys created</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead className="text-center">Completed</TableHead>
              <TableHead className="text-center">Max Participants</TableHead>
              <TableHead className="text-center">
                Current Participants
              </TableHead>
              <TableHead className="text-right">Results</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-left">
                Satisfaction
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell>2000</TableCell>
              <TableCell className="text-center">23</TableCell>
              <TableCell className="text-right px-0">
                <Link to="/results/:id">
                  <Button className="px-2 py-1 text-xs">See results</Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Dashboard;
