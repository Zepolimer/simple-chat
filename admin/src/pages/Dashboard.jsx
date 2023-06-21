import React from 'react';

import { NavLink, useNavigate } from "react-router-dom";
import Navigation from '../components/navigation/Navigation';

import { AuthState } from '../security/Context';


function Dashboard() {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthState);

  React.useEffect(() => {
    if(user == 0) navigate('/');
  }, [user])


  return (
    <div className='template'>
      <Navigation />

      <div className='header'>
        <h1>Bienvenue sur votre espace administrateur</h1>
      </div>

      <div className='content'>
        <p className='dashboard-text'>Depuis cette page, vous pouvez accéder à la liste des groupes et des utilisateurs.</p>

        <p className='dashboard-text'>Vous pourrez ensuite modérer votre application en consultant les diverses informations relatives au groupes privés et publiques ainsi que les messages qui les composent.</p>

        <p className='dashboard-text'>Vous pouvez principalement supprimer des groupes, des messages associés ou des utilisateurs.</p>

        <p className='dashboard-text'>Retrouvez la liste des <NavLink to={`channel`} className='uppercase blue-text'>groupes</NavLink> ou des <NavLink to={`user`} className='uppercase blue-text'>utilisateurs</NavLink></p>
      </div>
    </div>
  )
}

export default Dashboard
