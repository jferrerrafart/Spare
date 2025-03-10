import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useEffect, useState } from "react";
import spareAPI from "@/api/spareAPI";
import { iSurvey } from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/types/types.ts";

function SurveyComplete() {
  let params = useParams();
  const [survey, setSurvey] = useState<iSurvey | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("option_a");
  async function fetchData() {
    if (!params.id) return;
    const surveyBackup = await spareAPI.getSurveybyID(Number(params.id));
    setSurvey(surveyBackup);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  async function sendResponse() {
    if (survey?.id) {
      const responseData = {
        survey_id: survey.id,
        selected_option: selectedOption,
      };
      await spareAPI.postCreateResponse(responseData);
      navigate("/user-dashboard");
    } else {
      console.error("Survey ID is not available.");
    }
  }

  return (
    <div className="flex justify-center items-center py-15">
      <Card>
        <CardHeader className="py-10 px-20">
          <CardTitle>{survey ? survey.question : "Loading..."}</CardTitle>
          <CardDescription className="py-2">
            Please, choose one option and press "Send" when you are ready
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          <RadioGroup
            defaultValue="option_a"
            className="flex flex-col space-y-4 py-2 items-center"
            onValueChange={(value) => setSelectedOption(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option_a" id="option_a" />
              <Label htmlFor="option_a">
                {survey ? survey.option_a : "Loading..."}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option_b" id="option_b" />
              <Label htmlFor="option_b">
                {survey ? survey.option_b : "Loading..."}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option_c" id="option_c" />
              <Label htmlFor="option_c">
                {survey ? survey.option_c : "Loading..."}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option_d" id="option_d" />
              <Label htmlFor="option_d">
                {survey ? survey.option_d : "Loading..."}
              </Label>
            </div>
          </RadioGroup>
          <CardFooter className="flex justify-center space-x-4 py-17">
            <Link to="/user-dashboard">
              <Button className="px-5 py-1 text-xs bg-white text-black border border-gray-300 hover:bg-gray-100">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              onClick={sendResponse}
              className="px-7 py-1 text-xs"
            >
              Send
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}

export default SurveyComplete;
