import * as React from 'react';
import { AuthState } from './Context';
import { regenerateToken } from './Credential';

function Firewall({ children }) {
  const { user } = React.useContext(AuthState);

  React.useEffect(() => {
    let interval = setInterval(() => {
      check()
    }, 1000 * 60 * 5); // 5min : 1000ms * 60 = 60s * 5

    return function cleanUp() {
      clearInterval(interval);
    }
  }, [user])

  const check = async () => {
    if(user != 0) {
      regenerateToken();
      console.log('regenerate')
    }
  }


  return (
    <>
      {children}
    </>
  )
}

export default Firewall