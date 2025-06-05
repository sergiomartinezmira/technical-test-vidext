import { AlertComponent } from "components/alert";
import { useEffect, useState } from "react";

type ErrorProps = { error: string };

export const ErrorAlert = ({ error }: ErrorProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  if (!show) return null;
  return (
    <AlertComponent
      variant={"destructive"}
      title={"Error"}
      description={error}
    />
  );
};
