import React from 'react'
import { NavLink } from 'react-router-dom'
import { resetCredentials } from '../../security/Credential';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../security/Context';


function Navigation() {
  const navigate = useNavigate();
  const { setUser } = React.useContext(AuthState);

  const [openNav, setOpenNav] = React.useState(false);

  const disconnect = async () => {
    await resetCredentials()
    .then((res) => {
      setUser(0);
      navigate('/');
    })
  };

  return (
    <aside className='menu' style={openNav ? {backgroundColor: '#000000'} : {backgroundColor: 'transparent'}}>
      {openNav ? (
        <button onClick={() => setOpenNav(false)} className='menu-button'>X</button>
      ) : (
        <button onClick={() => setOpenNav(true)} className='menu-button'>O</button>
      )}
      {openNav && 
        <nav>
          <div className='menu-links'>
            <NavLink to={`/dashboard/channel`} className='navlink'>Groupes</NavLink>
            <NavLink to={`/dashboard/user`} className='navlink'>Utilisateurs</NavLink>

            <button onClick={() => disconnect()} className='small-red-button navlink-button'>Déconnexion</button>
          </div>
        </nav>
      }
    </aside>
  )
}

export default Navigation