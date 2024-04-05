import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface StudentDetailsProps {
  studentinfo: {
    roll: number;
    name: string;
    course: string;
    department: string;
    avatar: string;
  };
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ studentinfo }) => {
  return (
    <Card className="bg-gradient-to-br from-primary/70 flex flex-col justify-center to-primary border-none shadow-sm text-background">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-32 w-32 rounded-lg border-4 border-muted/25">
          <AvatarImage src={studentinfo.avatar} alt={studentinfo.name} />
          <AvatarFallback className="h1-bold rounded-lg text-foreground/60 select-none">
            CN
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold text-center">{studentinfo.name}</CardTitle>
        <CardDescription className="text-muted text-base text-center">Roll no. - {studentinfo.roll}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center items-center w-fit mx-auto gap-2 ">
        <Badge className="h-fit" variant={"secondary"}>{studentinfo.course}</Badge>
        <span className="text-lg font-semibold text-muted  text-center">{studentinfo.department}</span>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;
