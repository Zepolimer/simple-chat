import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { apiGet, apiGetToken } from '../utils/Api';


const HomeScreen = ({ navigation }) => {
  const [userConversations, setUserConversations] = React.useState(null);

  const getUsers = async () => {
    // await apiGet('users')
    const conversations = await apiGetToken('user/5/conversations', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImlhdCI6MTY3MzM1OTA5NSwiZXhwIjoxNjczMzYyNjk1fQ.pro-VD8CYClfod_k0kkmuqgfTh00OGMlnEnHiaO_QMA');
    
    setUserConversations(conversations)
    console.log('conversations : ' + userConversations)
  };

  React.useEffect(() => {
    console.log(userConversations)
  })

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        });
      }}
    />
    <Button title="Utilisateurs" onPress={getUsers} />
  </View>
  )
}


export default HomeScreen