import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert";
import { AlertCircleIcon, BadgeInfoIcon } from "lucide-react";

type AlertComponentProps = {
  variant: "default" | "destructive";
  title: string;
  description?: string | null;
};

export const AlertComponent = ({
  variant,
  title,
  description,
}: AlertComponentProps) => {
  return (
    <Alert
      variant={variant}
      className="z-[999] fixed w-sm border-accent-foreground right-2 top-2 fade-out-5"
    >
      {variant === "default" && <BadgeInfoIcon />}
      {variant === "destructive" && <AlertCircleIcon />}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};
