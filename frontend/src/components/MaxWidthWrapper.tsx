import { cn } from "../lib/utils";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={cn(
    "h-full mx-auto w-full max-w-screen-lg px-2.5 lg:px-20 ",
    className
  )}>{children}</div>;
};

export default MaxWidthWrapper;
