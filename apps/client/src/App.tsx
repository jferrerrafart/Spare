//import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function App() {
  return (
    <>
      {/* Header Section */}
      <div className="relative flex items-center w-full px-0 py-2 border-b">
        {/* Left Side: Toggle Group */}
        <div className="flex">
          <ToggleGroup
            type="single"
            defaultValue="company"
            className="space-x-0.5 border border-grey rounded-sm text-xs"
          >
            <ToggleGroupItem
              value="company"
              aria-label="Company View"
              className="px-5 py-1 text-xs"
            >
              Company View
            </ToggleGroupItem>
            <ToggleGroupItem
              value="user"
              aria-label="User View"
              className="px-2 py-1 text-xs"
            >
              User View
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Center: Logo (Always centered) */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
          Spare
        </h1>

        {/* Right Side: Connect Wallet Button */}
        <div className="ml-auto">
          <Button>Connect Wallet</Button>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="mt-6 px-4">
        <Button>Create New Survey</Button>
      </div>
      {/* Table Section */}
      <div className="px-30">
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
                <Button className="px-2 py-1 text-xs">See results</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default App;
