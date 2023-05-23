import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Home } from './Home';
import { SesionPage } from './SesionPage';
import { FetchGetData } from '../helpers/FetchGetData';
import { Toaster, toast } from 'react-hot-toast';
import routes from '../static/routes.json';

const RecoverAccount = ({ email, login, months }) => {

  if (!login) {
    return (
      <Outlet />
    )  
  }
  else {
    return(
      <>
        <Home email={email} months={months} />
        <Toaster />
      </>
    );} 

  return <SesionPage />;
};

export default RecoverAccount;
