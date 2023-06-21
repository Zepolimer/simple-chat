import React from 'react'

import { useNavigate } from 'react-router-dom';
import { AuthState } from '../security/Context';
import { simpleRequest, secureRequest } from '../security/Api';

import Header from '../components/navigation/Header';
import Navigation from '../components/navigation/Navigation';
import List from '../components/list/List';
import Modal from '../components/modal/Modal';


function Users() {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthState);

  const [status, setStatus] = React.useState(null)
  const [userList, setUserList] = React.useState(null);

  const [userModal, setUserModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const getAllUsers = async () => {
    await simpleRequest(
      'users',
      'GET',
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setUserList(res.data);
    });
  }

  const deleteUser = async (id) => {
    await secureRequest(
      `user/${id}`,
      'DELETE',
    )
    .then((res) => {
      setUserModal(false);
      getAllUsers();
    })
  }

  const openUserModal = (user) => {
    setUserModal(true); 
    setSelectedUser(user);
  }


  React.useEffect(() => {
    if(user == 0) navigate('/');
    else getAllUsers();
    
    return () => { getAllUsers() }
  }, [status, user])


  return (
    <div className='template'>
      <Navigation />

      <div className='header'>
        <Header />

        <h2>Utilisateurs</h2>
      </div>

      <div className='content'>
        {userList &&
          <div className='wrap-container'>
            {userList.map((user, index) => {
              return (
                <List
                  // navigateTo={`user/${user.id}`}
                  key={index}
                  content={`${user.firstname} ${user.lastname}`}
                  openModal={() => openUserModal(user)}
                />
              )
            })}

            {userModal && 
              <Modal 
                item={selectedUser.firstname + " " + selectedUser.lastname}
                identify={"l'utilisateur"}
                deleteMethod={() => deleteUser(selectedUser.id)}
                cancelMethod={() => setUserModal(false)}
              />
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Users