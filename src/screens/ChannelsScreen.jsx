import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { getRequest, secureGetRequest } from '../security/Api';
import { getAccessToken, getRefreshToken, getUserId } from '../security/AsyncStorage';
import { regenerateToken } from '../security/Credential';

import styles from '../style/style';


const ChannelsScreen = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [channelList, setChannelList] = React.useState(null);
  const [status, setStatus] = React.useState(null)
  const [channels, setChannels] = React.useState(null);

  const userInfos = async () => {
    await getAccessToken().then((token) => { 
      setAccess(token) 
    });

    await getRefreshToken().then((token) => { 
      setRefresh(token) 
    });

    await getUserId().then((user) => { 
      setUser(user) 
    });
  };

  const getAllChannels = async () => {
    await getRequest('channels')
    .then((res) => {
      setChannelList(res.data);
    });
  }

  const getChannels = async () => {
    await secureGetRequest(
      `user/${user}/channels`, 
      access
    )
    .then((res) => {
      console.log(res.data)
      setStatus(res.status);
      setChannels(res.data);
    });
  }

  React.useEffect(() => {
    userInfos();
    getAllChannels();

    if(access != '' && user != 0) getChannels();
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getChannels();
    }
  }, [])


  return (
    <View style={styles.viewDisplay}>
      <View>
      {channelList != null &&
        channelList.map((channel, index) => {
          return (
            <View key={index}>
              <Pressable 
                style={styles.blackBtn}
                title={channel.id} 
                onPress={() => { 
                  navigation.navigate('Channel', {
                    id: channel.id,
                  });
                }}
              >
                <Text style={styles.blackBtnText}>
                {channel.name}
                </Text>
              </Pressable>
            </View>
          )
        })
      }
      </View>

    {status == 'Success' && channels != null ? (
      channels.map((channel, index) => {
        return (
          <View key={index}>
            <Pressable 
              style={styles.blackBtn}
              title={channel.id} 
              onPress={() => { navigation.navigate('Channel', {
                  id: channel.id,
              })}
            }>
              <Text style={styles.blackBtnText}>
              {channel.name}
              </Text>
            </Pressable>
          </View>
        )
      })
    ) : (
      <Text>Pas de groupe rejoint..</Text>
    )}
  </View>
  )
}


export default ChannelsScreen