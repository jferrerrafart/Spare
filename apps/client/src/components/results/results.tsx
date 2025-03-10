import { Button } from "@/components/ui/button";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router";
import spareAPI from "@/api/spareAPI";
import { useEffect, useState } from "react";
import {
  iSurvey,
  iResults,
} from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/types/types.ts";

function Results() {
  let params = useParams();
  const [surveyR, setSurveyR] = useState<iSurvey | null>(null);
  const [results, setResults] = useState<iResults | null>(null);
  async function fetchData() {
    if (!params.id) return;
    const surveyBackup = await spareAPI.getSurveybyID(Number(params.id));
    setSurveyR(surveyBackup);
  }
  async function fetchData2() {
    if (!params.id) return;
    const surveyResults = await spareAPI.getSurveyResults(Number(params.id));
    setResults(surveyResults);
  }

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  return (
    <div className="flex justify-center items-center py-15">
      <Card>
        <CardHeader className="py-10 px-20">
          <CardTitle>{surveyR ? surveyR.question : "Loading..."}</CardTitle>
          <CardDescription className="py-2">
            Total responses: {results ? results.totalResponses : "Loading..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          <p>
            {surveyR ? surveyR.option_a : "Loading..."}:{" "}
            {results ? results.option_a : "Loading..."}%
          </p>
          <p>
            {surveyR ? surveyR.option_b : "Loading..."}:{" "}
            {results ? results.option_b : "Loading..."}%
          </p>
          <p>
            {surveyR ? surveyR.option_c : "Loading..."}:{" "}
            {results ? results.option_c : "Loading..."}%
          </p>
          <p>
            {surveyR ? surveyR.option_d : "Loading..."}:{" "}
            {results ? results.option_d : "Loading..."}%
          </p>
          <CardFooter className="flex justify-center space-x-4 py-17">
            <Link to="/">
              <Button className="px-5 py-1 text-xs bg-black text-white border border-gray-300">
                Back to the dashboard
              </Button>
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}

export default Results;
