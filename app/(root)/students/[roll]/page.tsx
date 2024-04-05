import studentData from "@/Dummies/StudentData.json";
import StudentDetails from "./(components)/StudentDetails";
import StudentPapers from "./(components)/StudentPapers";
import AttendaceCalender from "./(components)/AttendaceCalender";

type Student = {
  id: string;
  roll: number;
  name: string;
  course: string;
  department: string;
  avatar: string;
  papers: string[];
};

async function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  return studentData as Student[];
}

export default async function Page({ params }: { params: { roll: string } }) {
  const data = await getData();
  const student = data.find((s) => s.roll.toString() === params.roll);

  if (!student) {
    return <div>Student not found</div>;
  }

  const { papers, ...studentInfo } = student;

  return (
    <div className="flex p-6 flex-col md:max-h-full md:grid md:grid-cols-[1fr_3fr] md:grid-rows-[1fr_2fr] gap-4">
      <StudentDetails studentinfo={studentInfo} />
      <StudentPapers
        className="row-start-2 bg-card max-md:max-h-[50vh] overflow-y-scroll no-scrollbar"
        papers={papers}
      />
      <section className="bg-card border rounded-md shadow-sm text-justify row-span-2 p-4 overflow-y-scroll no-scrollbar">
        <AttendaceCalender papers={papers} />
      </section>
    </div>
  );
}
