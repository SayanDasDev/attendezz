import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ className, title }) => (
  <div
    className={cn(
      "flex flex-grow items-center h3-medium pb-3 select-none",
      className
    )}
  >
    <Badge className="rotate-90"></Badge>
    <div>{title}</div>
  </div>
);