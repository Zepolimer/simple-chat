import React from 'react';
import { Navigate } from "react-router-dom";

import { simpleRequestContent } from '../security/Api';
import { setCredentials } from '../security/Credential';
import Input from '../components/input/Input';
import SecureInput from '../components/input/SecureInput';
import { AuthState } from '../security/Context';


function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { user, setUser } = React.useContext(AuthState);

  const userLogin = async () => {
    if(email != '' && password != ''){
      let user = {
        'email': email,
        'password': password,
      }

      await simpleRequestContent('login', 'POST', user)
      .then((res) => {
        setCredentials(
          res.data.access_token, 
          res.data.refresh_token, 
          res.data.user_id
        )

        setUser(res.data.user_id)
      })
    }
  }

  return (
    <div>
      <div className='header'>
        <h1>Connectez-vous pour accéder à votre dashboard</h1>
      </div>

      <div className='content'>
        <div className='form'>
          <Input 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={"Email"}
          />
          <SecureInput 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={"Mot de passe"}
          />

          <button onClick={() => userLogin()} className='black-button form-button'>Connexion</button>
        </div>
      </div>

      {user != 0 &&
        <Navigate to="/dashboard" replace={true} />
      }
    </div>
  )
}

export default Login