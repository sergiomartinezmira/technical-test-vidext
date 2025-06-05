"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "components/shadcn/card";

type ErrorProps = { error: Error };

export default function ErrorComponent({ error }: ErrorProps) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="h-md w-md flex justify-center items-center flex-col">
        <CardTitle className="text-destructive">Error</CardTitle>
        <CardDescription className="text-destructive/90">
          The app crashed unexpectecly.
        </CardDescription>
        {error && <CardContent>{error.message}</CardContent>}
      </Card>
    </div>
  );
}
