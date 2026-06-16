import { Loader } from "./Loader";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Loader size="lg" />
    </div>
  );
};
