import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Home } from './Home';
import { SesionPage } from './SesionPage';
import { FetchGetData } from '../helpers/FetchGetData';
import { Toaster, toast } from 'react-hot-toast';
import routes from '../static/routes.json';

async function getRecover(email) {
  return await FetchGetData(`${routes.RESET_PASSWORD}/${email}`);
}

const RecoverAccount = ({ email, login, months }) => {
  const [isRecover, setIsRecover] = useState(false);

  useEffect(() => {
    getRecover(email)
      .then((response) => response.json())
      .then((data) => {
        setIsRecover(data);
      })
      .catch((e) => {
        if (
          e.message !==
          `Unexpected token 'Y', "You need t"... is not valid JSON`
        ) {
          toast.error(e.message, {
            position: 'top-right',
            duration: 6000,
            style: {
              background: 'rgba(250, 215, 215)',
              fontSize: '1rem',
              fontWeight: '500'
            }
          });
        }
      });
  }, [email]);

  if (login === true) {
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
