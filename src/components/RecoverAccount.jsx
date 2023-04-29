import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Home } from "./Home";
import { SesionPage } from "./SesionPage";
import { FetchGetData } from "../helpers/FetchGetData";
import { Toaster, toast } from "react-hot-toast";
import routes from "../static/routes.json";

export const useRecover = (user) => {
  return user && user.recover;
};

const RecoverAccount = ({ email, login, months }) => {
  const [isRecover, setIsRecover] = useState(null);

  useEffect(() => {
    //Get recover
    async function getRecover(email) {
      return await FetchGetData(`/${email}`);
    }
    const res = getRecover(email);
    if (!(res instanceof Error)) {
      setIsRecover(res);
    } else {
      toast.error(res.message, {
        position: "top-right",
        duration: 6000,
        style: {
          background: "rgba(250, 215, 215)",
          fontSize: "1rem",
          fontWeight: "500",
        },
      });
    }
  }, [email]);

  if (login) {
    return isRecover ? (
      <Outlet />
    ) : (
      <>
        <Home email={email} months={months} />
        <Toaster />
      </>
    );
  }

  return <SesionPage />;
};

export default RecoverAccount;
