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

import { 
  getCredentials, 
  regenerateToken 
} from '../../security/Credential';

import FixedHeader from '../../components/header/FixedHeader';
import UserConversations from '../../components/flatlist/UserConversations'
import PublicUser from '../../components/flatlist/PublicUser';

import styles from '../../style/style';


const Conversations = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [userList, setUserList] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [conversations, setConversations] = React.useState(null);

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

  const getAllUsers = async () => {
    await getRequest('users')
    .then((res) => {
      if(res.status != 'Error') {
        setUserList(res.data);
      }
    });
  }

  const getConversations = async () => {
    await secureGetRequest(
      `user/${user}/conversations`, 
      access
    )
    .then((res) => {
      setStatus(res.status)
      if(res.status != 'Error') {
        setConversations(res.data);
      } 
    });
  }


  React.useEffect(() => {
    userCredential();
    getAllUsers();

    if(access != '' && user != 0) getConversations();
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getConversations();
    }

    /**
    * CLEAN STATE
    */
    const handleFocus = navigation.addListener('focus', () => {
      getConversations();
    });

    return handleFocus;
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeader 
        iconName={'pencil'}
      />
      
      <View style={styles.horizontalWrapper}>
        <FlatList
          data={userList}
          renderItem={({item}) => <PublicUser u={item} user={user} access={access} navigation={navigation} />}
          keyExtractor={item => item.id}
          extraData={[user, access, navigation]}
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