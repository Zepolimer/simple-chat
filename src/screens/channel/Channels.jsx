import * as React from 'react';
import { 
  SafeAreaView,
  View, 
  FlatList,
} from 'react-native';

import { 
  getRequest, 
  secureGetRequest,
} from '../../security/Api';

import { 
  getCredentials, 
  regenerateToken 
} from '../../security/Credential';

import FixedHeader from '../../components/header/FixedHeader';
import UserChannels from '../../components/flatlist/UserChannels';

import styles from '../../style/style';
import PublicChannel from '../../components/flatlist/PublicChannel';


const Channels = ({ navigation }) => {
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
    await getRequest(
      `channels`, 
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

    /**
     * CLEAN STATE
     */
    const handleFocus = navigation.addListener('focus', () => {
      getAllChannels();
      getChannels();
    });

    return handleFocus;
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeader 
        iconName={'pencil'}
        navigateTo={() => navigation.navigate('NewChannel')}
      />

      <View style={styles.horizontalWrapper}>
        <FlatList
          data={channelList}
          renderItem={({item}) => <PublicChannel channel={item} user={user} access={access} navigation={navigation} />}
          keyExtractor={item => item.id}
          extraData={[user, access, navigation]}
          horizontal={true}
        />
      </View>

      <View style={styles.viewChat}>
        <FlatList
          data={channels}
          renderItem={({item}) => <UserChannels channel={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          extraData={[navigation]}
        />
      </View>
    </SafeAreaView>
  )
}


export default Channels