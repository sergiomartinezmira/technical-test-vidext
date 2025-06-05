import { Skeleton } from "./shadcn/skeleton";
import { Spinner } from "./spinner";

type LoadingProps = { spinnerOnly?: boolean };

export const LoadingComponent = ({ spinnerOnly = false }: LoadingProps) => {
  return (
    <div className="h-screen w-screen max-h-screen max-w-screen flex flex-col justify-between ">
      <div>
        {!spinnerOnly && (
          <div className="flex flex-row justify-between">
            <Skeleton className="h-[40px] w-[300px] rounded-br-lg border-1 animate-pulse" />
            <Skeleton className="h-[250px] w-[150px] rounded-lg mt-2 mr-2 border-1 animate-pulse" />
          </div>
        )}
      </div>

      <div className="flex justify-center items-center flex-col fixed inset-0">
        <Spinner size={32} />
        {!spinnerOnly && <div className="text-2xl">Loading editor data</div>}
      </div>

      {!spinnerOnly && (
        <div className="flex justify-center items-center ">
          <Skeleton className="mb-2 h-[40px] w-[440px] rounded-lg border-1 animate-pulse" />
        </div>
      )}
    </div>
  );
};
