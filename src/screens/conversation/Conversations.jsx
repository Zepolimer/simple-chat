import * as React from 'react';
import { 
  SafeAreaView,
  View, 
  FlatList,
} from 'react-native';


import { 
  getRequest, 
  secureGetRequest, 
  secureFastPostRequest 
} from '../../security/Api';

import { getUserId } from '../../security/AsyncStorage';
import { regenerateToken } from '../../security/Credential';

import FixedHeader from '../../components/header/FixedHeader';
import UserConversations from '../../components/flatlist/UserConversations'
import PublicUser from '../../components/flatlist/PublicUser';

import styles from '../../style/style';


const Conversations = ({ navigation }) => {
  const [user, setUser] = React.useState(0);

  const [userList, setUserList] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [conversations, setConversations] = React.useState(null);

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  const getAllUsers = async () => {
    await getRequest('users')
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setUserList(res.data);
    });
  }

  const getConversations = async () => {
    await secureGetRequest(
      `user/${user}/conversations`, 
    )
    .then((res) => {
      setStatus(res.status)

      if(res.status != 'Error') setConversations(res.data);
    });
  }


  React.useEffect(() => {
    userCredential();

    if(status == 'Error') {
      regenerateToken();
    } else if(status != 'Error') {
      getAllUsers();
      getConversations();
    }

    /**
    * CLEAN STATE
    */
    const handleFocus = navigation.addListener('focus', () => {
      getAllUsers();
      getConversations();
    });

    return handleFocus;
  }, [status, user])


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeader 
        iconName={'pencil'}
      />
      
      <View style={styles.horizontalWrapper}>
        <FlatList
          data={userList}
          renderItem={({item}) => <PublicUser u={item} user={user} onPress={getConversations} />}
          keyExtractor={item => item.id}
          extraData={[user, getConversations]}
          horizontal={true}
        />
      </View>

      <View style={styles.viewChat}>
        <FlatList
          data={conversations}
          renderItem={({item}) => <UserConversations conversation={item} user={user} navigation={navigation} />}
          keyExtractor={item => item.id}
          extraData={[user, navigation]}
        />
      </View>
    </SafeAreaView>
  )
}


export default Conversations