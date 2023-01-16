import * as React from 'react';
import { Pressable, Text, View, ScrollView, SafeAreaView } from 'react-native';
import FixedHeader from '../components/FixedHeader';

import { secureGetRequest, secureFastPostRequest } from '../security/Api';
import { getCredentials, regenerateToken } from '../security/Credential';

import styles from '../style/style';


const ChannelsScreen = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [channelList, setChannelList] = React.useState(null);
  const [status, setStatus] = React.useState(null)
  const [channels, setChannels] = React.useState(null);

  const userCredential = async () => {
    await getCredentials()
    .then((res) => {
      if(res) {
        setAccess(res.access);
        setRefresh(res.refresh);
        setUser(res.user);
      }
    });
  }

  const getAllChannels = async () => {
    await secureGetRequest(
      `user/${user}/channelstojoin`, 
      access
    )
    .then((res) => {
      if(res.status == 'Error') {
        regenerateToken(refresh);
      } else {
        setChannelList(res.data);
      }
    });
  }

  const getChannels = async () => {
    await secureGetRequest(
      `user/${user}/channels`, 
      access
    )
    .then((res) => {
      setStatus(res.status);
      setChannels(res.data);
    });
  }

  const postJoinChannel = async (id) => {
    await secureFastPostRequest(
      `user/${user}/channel/${id}`, 
      access
    )
    .then((res) => {
      navigation.navigate('Channel', {
        id: id,
      })
    })
  }

  React.useEffect(() => {
    userCredential();

    if(access != '' && user != 0) {
      getAllChannels();
      getChannels();
    }
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getAllChannels();
      getChannels();
    }
  }, [status])


  return (
    <SafeAreaView>
      <FixedHeader 
        iconName={'pencil'}
        navigateTo={() => navigation.navigate('NewChannel')}
      />
      <ScrollView>
      {user != 0 &&
        <View>
        {channelList != null &&
          <View style={styles.horizontalWrapper}>
          <ScrollView horizontal={true}>
          {channelList.map((channel, index) => {
            return (
              <View key={index}>
                <Pressable 
                  style={styles.horizontalItemGroupe}
                  title={channel.Channel.id} 
                  onPress={() =>  postJoinChannel(channel.Channel.id)}> 
                  <Text style={styles.horizontalItemTextGroupe}>
                  {channel.Channel.name}
                  </Text>
                </Pressable>
              </View>
            )
          })}
          </ScrollView>
          </View>
        }
        </View>
      }

      {user != 0 &&
        <View style={styles.viewChat}>
          <Text style={styles.title}>Vos groupes</Text>
          <ScrollView style={{flexDirection: 'column'}}>
          {status == 'Success' && channels != null ? (
            channels.map((channel, index) => {
              return (
                <View key={index}>
                  <Pressable 
                    style={styles.chatBtn}
                    title={channel.Channel.id} 
                    onPress={() => { navigation.navigate('Channel', {
                        id: channel.Channel.id,
                        name: channel.Channel.name,
                    })}
                  }>
                    <Text style={styles.chatText}>
                    {channel.Channel.name}
                    </Text>
                  </Pressable>
                </View>
              )
            })
          ) : (
            <Text>Pas de groupe rejoint..</Text>
          )}
          </ScrollView>
        </View>
      }
      </ScrollView>
    </SafeAreaView>
  )
}


export default ChannelsScreen