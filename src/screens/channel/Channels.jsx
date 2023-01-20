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

import { getUserId } from '../../security/AsyncStorage';
import { regenerateToken } from '../../security/Credential';

import FixedHeader from '../../components/header/FixedHeader';
import UserChannels from '../../components/flatlist/UserChannels';

import styles from '../../style/style';
import PublicChannel from '../../components/flatlist/PublicChannel';


const Channels = ({ navigation }) => {
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [channelList, setChannelList] = React.useState(null);
  const [channels, setChannels] = React.useState(null);

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  const getAllChannels = async () => {
    await getRequest(`channels`)
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setChannelList(res.data);
    });
  }

  const getChannels = async () => {
    await secureGetRequest(
      `user/${user}/channels`, 
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setChannels(res.data);
    });
  }


  React.useEffect(() => {
    userCredential();

    if(status == 'Error') {
      regenerateToken();
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
  }, [status, user])


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeader 
        iconName={'pencil'}
        navigateTo={() => navigation.navigate('NewChannel')}
      />

      <View style={styles.horizontalWrapper}>
        <FlatList
          data={channelList}
          renderItem={({item}) => <PublicChannel channel={item} user={user} navigation={navigation} />}
          keyExtractor={item => item.id}
          extraData={[user, navigation]}
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