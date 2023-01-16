import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View, ScrollView, SafeAreaView, Alert } from 'react-native';

import { getRequest, secureFastPostRequest, secureDeleteRequest } from '../security/Api';
import { getCredentials, regenerateToken } from '../security/Credential';

import styles from '../style/style';
import BlackPressable from '../components/BlackPressable';


const AddUserInChannelScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { name } = route.params.name;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null);
  const [userList, setUserList] = React.useState(null);
  const [addedUsers, setAddedUsers] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

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

  const getUserInChannel = async () => {
    await getRequest(`channel/${id}/users`)
    .then((res) => {
      if(res.status != 'Error') {
        setAddedUsers(res.data);
      }
    });
  }

  const getAllUsers = async () => {
    await getRequest('users')
    .then((res) => {
      setStatus(res.status)
      if(res.status != 'Error') {
        setUserList(res.data);
      }
    });
  }

  const addUser = async (userToAdd) => {
    await secureFastPostRequest(
      `user/${user}/channel/${id}/add/${userToAdd}`,
      access,
    )
    .then((res) => {
      if(res.status != 'Error') {
        Alert.alert("L'utilisateur à été ajouté à votre groupe avec succès.")
      }

      getUserInChannel();
      getAllUsers();
    })
  }

  const removeUser = async (userToRemove) => {
    await secureDeleteRequest(
      `user/${user}/channel/${id}/remove/${userToRemove}`,
      access,
    )
    .then((res) => {
      if(res.status != 'Error') {
        Alert.alert("L'utilisateur à été supprimé de votre groupe avec succès.")
      }

      getUserInChannel();
      getAllUsers();
    })
  }


  React.useEffect(() => {
    userCredential();
    getAllUsers();
  }, [status])


  return (
    <SafeAreaView style={styles.viewChat}>
    <ScrollView>
      <BlackPressable
        title={'Continuer'}
        onPress={() => navigation.navigate('Channel', {
          id: id,
          name: name,
        })}
        text={'Continuer'}
      />
      <View>
        {addedUsers != null && 
        <ScrollView style={{flexDirection: 'column'}}>
          <Text style={styles.title}>Utilisateurs invités :</Text>
          {addedUsers.map((u, index) => {
            return (
              <View key={index}>
                {u.User.id != user &&
                  <View style={styles.chatBtn}>
                    <View style={styles.horizontalItemImg}></View>
                    <Text style={styles.chatText}>{u.User.firstname} {u.User.lastname}</Text>
                    <Pressable 
                      style={styles.addOrRemoveBtn}
                      title={u.User.firstname} 
                      onPress={() => removeUser(u.User.id)}
                    >
                      <Ionicons 
                        name={'close'}
                        color={'gray'} 
                        size={'20px'}
                      />
                    </Pressable>
                  </View>
                }
              </View>
            )
          })}
        </ScrollView>
        }
      </View>

      {userList != null && 
        <ScrollView style={{flexDirection: 'column'}}>
          <Text style={styles.title}>Utilisateurs que vous pouvez inviter :</Text>
          {userList.map((u, index) => {
            return (
              <View key={index}>
                {u.id != user && 
                  <View style={styles.chatBtn}>
                    <View style={styles.horizontalItemImg}></View>
                    <Text style={styles.chatText}>{u.firstname} {u.lastname}</Text>
                    <Pressable 
                      style={styles.addOrRemoveBtn}
                      title={u.firstname} 
                      onPress={() => addUser(u.id)}
                    >
                      <Ionicons 
                        name={'add'}
                        color={'gray'} 
                        size={'20px'}
                      />
                    </Pressable>
                  </View>
                }
              </View>
            )
          })}
        </ScrollView>
      }
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddUserInChannelScreen
