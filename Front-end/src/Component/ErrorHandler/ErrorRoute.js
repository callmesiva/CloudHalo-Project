import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className=" border-2 w-80 m-auto mt-10 p-5 text-center">
      <h1>Oops! something went wrong</h1>
      <h2>Route not exists...</h2>
      <h3>{err.status}</h3>
      <h4>{err.statusText}</h4>
    </div>
  );
};

export default Error;
