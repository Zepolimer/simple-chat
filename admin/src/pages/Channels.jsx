import React from 'react'

import { useNavigate } from 'react-router-dom';
import { AuthState } from '../security/Context';
import { secureRequest } from '../security/Api';

import Header from '../components/navigation/Header';
import Navigation from '../components/navigation/Navigation';
import List from '../components/list/List';
import Modal from '../components/modal/Modal';


function Channels() {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthState);

  const [status, setStatus] = React.useState(null)
  const [channelList, setChannelList] = React.useState(null);

  const [channelModal, setChannelModal] = React.useState(false);
  const [selectedChannel, setSelectedChannel] = React.useState(null);

  const getAllChannels = async () => {
    await secureRequest(
      `admin/${user}/channels`, 
      'GET',
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setChannelList(res.data);
    });
  }

  const openChannelModal = (channel) => {
    setChannelModal(true); 
    setSelectedChannel(channel);
  }

  const deleteChannel = async (id) => {
    await secureRequest(
      `user/${user}/channel/${id}`,
      'DELETE',
    )
    .then((res) => {
      if(res.status == 'Success') {
        getAllChannels();
        setChannelModal(false)
      } 
    });
  }

  React.useEffect(() => {
    if(user == 0) navigate('/');
    else getAllChannels();

    return () => { getAllChannels() }
  }, [status, user])


  return (
    <div className='template'>
      <Navigation />

      <div className='header'>
        <Header />

        <h2>Groupes</h2>
      </div>

      <div className='content'>
        {channelList &&
          <div className='wrap-container'>
            {channelList.map((channel, index) => {
              return (
                <List 
                  navigateTo={`${channel.id}`}
                  key={index}
                  content={`${channel.name} - ${channel.private ? "(Privée)" : "(Public)"}`}
                  openModal={() => openChannelModal(channel)}
                />
              )
            })}

            {channelModal && 
              <Modal
                item={selectedChannel.name}
                identify={"le groupe"}
                deleteMethod={() => deleteChannel(selectedChannel.id)}
                cancelMethod={() => setChannelModal(false)}
              />
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Channels