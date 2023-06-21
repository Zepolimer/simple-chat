import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { secureRequest } from '../security/Api';
import { AuthState } from '../security/Context';

import Modal from '../components/modal/Modal';
import Header from '../components/navigation/Header';
import Navigation from '../components/navigation/Navigation';


function Channel() {
  let params = useParams()
  const navigate = useNavigate();
  const { user } = React.useContext(AuthState);

  const [status, setStatus] = React.useState(null);
  const [channel, setChannel] = React.useState(null);

  const [messageModal, setMessageModal] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState(false);

  const getMessages = async () => {
    await secureRequest(
      `channel/${params.id}`, 
      'GET',
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setChannel(res.data.messages);
    });
  }

  const openMessageModal = (msg) => {
    setMessageModal(true); 
    setSelectedMessage(msg);
  }

  const deleteMessage = async (msg_id) => {
    await secureRequest(
      `user/${user}/channel/${params.id}/message/${msg_id}`,
      'DELETE',
    )
    .then((res) => {
      if(res.status == 'Success') {
        getMessages();
        setMessageModal(false);
      }
    })
  }

  React.useEffect(() => {
    if(user == 0) navigate('/');
    else getMessages();

    return () => {
      getMessages();
    }
  }, [status, user])


  return (
    <div className='template'>
      <Navigation />

      <div className='header'>
        <Header />

        <h2>Discussion de groupe</h2>
      </div>

      <div className='content'>
        {channel &&
          <div className='content-center'>
            {channel.map((channel, index) => {
              return (
              <div key={index} className='message'>
                <div className='message-header'>
                  <p className='message-author uppercase'>{channel.User.firstname} {channel.User.lastname}</p>
                  <button onClick={() => {openMessageModal(channel)}} className='small-red-button'>Supprimer</button>
                </div>
                <p className='message-content'>{channel.message}</p>
              </div>
              )
            })}

            {messageModal && 
              <Modal 
                item={selectedMessage.User.firstname + " " + selectedMessage.User.lastname}
                identify={"le message rédigé par"}
                deleteMethod={() => deleteMessage(selectedMessage.id)}
                cancelMethod={() => setMessageModal(false)}
              />
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Channel