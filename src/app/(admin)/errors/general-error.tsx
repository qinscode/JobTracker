import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

type GeneralErrorProps = {
  minimal?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const router = useRouter();
  return (
    <div className={cn("h-svh w-full", className)}>
      <div className="m-auto flex size-full flex-col items-center justify-center gap-2">
        {!minimal && (
          <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        )}
        <span className="font-medium">
          Oops! Something went wrong
          {`:')`}
        </span>
        <p className="text-center text-muted-foreground">
          We apologize for the inconvenience.
          {" "}
          <br />
          {" "}
          Please try again later.
        </p>
        {!minimal && (
          <div className="mt-6 flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
