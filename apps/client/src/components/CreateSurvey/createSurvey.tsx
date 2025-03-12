import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/api/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import spareAPI from "@/api/spareAPI";
import React from "react";
//import { useState } from "react";
interface CreateSurveyProps {
  companyId: number | null;
}

const CreateSurvey: React.FC<CreateSurveyProps> = ({ companyId }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_id: companyId ?? undefined,
      title: "",
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
    },
  });
  const navigate = useNavigate();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await spareAPI.postCreateSurvey(values);
    console.log(values);
    navigate("/");
  }

  return (
    <div className="px-50 py-15">
      <Card>
        <CardHeader>
          <CardTitle>Create a new survey</CardTitle>
          <CardDescription>
            Please, fill the content and press "Send" when you are ready
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Título */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Survey's title</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pregunta */}
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Survey's question</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Opciones */}
              {["option_a", "option_b", "option_c", "option_d"].map(
                (option) => (
                  <FormField
                    key={option}
                    control={form.control}
                    name={option as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Option {option.split("_")[1].toUpperCase()}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}

              <CardFooter className="flex justify-center space-x-4">
                <Link to="/">
                  <Button className="px-5 py-1 text-xs bg-white text-black border border-gray-300 hover:bg-gray-100">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="px-7 py-1 text-xs">
                  Send
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSurvey;
