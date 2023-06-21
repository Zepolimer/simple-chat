import React from 'react';
import { 
  useLocation,
  useNavigate, 
} from 'react-router-dom'


function Header() {
  
  const navigate = useNavigate();
  const location = useLocation()


  return (
    <header className='nav-header'>
      <button onClick={() => navigate(-1)} className='black-button'>Retour</button>
      <p className='white-text uppercase'>{location.pathname.substring(1)}</p>
    </header>
  )
}

export default Header