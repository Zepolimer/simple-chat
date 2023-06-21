import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import './index.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Channel from './pages/Channel';
import Channels from './pages/Channels';
import Users from './pages/Users';
import { AuthState } from './security/Context';
import Firewall from './security/Firewall';
import { getUserId } from './security/AsyncStorage';

function App() {
  const [user, setUser] = React.useState(0);

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  // React.useEffect(() => {
  //   userCredential();
  // }, [user])
  // console.log(user)

  return (
    <AuthState.Provider value={{ user, setUser }}>
      <Router>
        <Firewall>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/dashboard/' element={(user != 0 || user == null) ? <Dashboard/> : <Navigate to={'/'} />} />
            <Route path='/dashboard/channel/' element={(user != 0 || user == null) ? <Channels/> : <Navigate to={'/'} />} />
            <Route path='/dashboard/channel/:id/' element={(user != 0 || user == null) ? <Channel/> : <Navigate to={'/'} />} />
            <Route path='/dashboard/user/' element={(user != 0 || user == null) ? <Users/> : <Navigate to={'/'} />} />
          </Routes>
        </Firewall>
      </Router>
    </AuthState.Provider>
  )
}

export default App