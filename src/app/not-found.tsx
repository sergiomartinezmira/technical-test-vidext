import { Button } from "components/shadcn/button";
import { Card } from "components/shadcn/card";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className=" h-72 w-96 flex justify-center items-center flex-col ">
        <h2 className="text-2xl">404 - Not Found</h2>
        <p>Could not find the requested resource</p>
        <Link href="/">
          <Button variant="default">Return Home</Button>
        </Link>
      </Card>
    </div>
  );
}
