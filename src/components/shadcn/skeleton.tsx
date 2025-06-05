import { cn } from "utils/cnHelper";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent", className)}
      {...props}
    />
  );
}

export { Skeleton };
