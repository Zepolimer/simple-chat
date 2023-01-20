import * as React from 'react'
import { 
  SafeAreaView,
  View, 
  ScrollView, 
  Pressable, 
  Text, 
} from 'react-native';

import { 
  secureGetRequest, 
  secureFastPostRequest 
} from '../../security/Api';

import { getUserId } from '../../security/AsyncStorage';
import { regenerateToken } from '../../security/Credential';


import FormInput from '../../components/FormInput';
import styles from '../../style/style';


const ConversationCreate = ({ navigation }) =>  {
  const [user, setUser] = React.useState(0);

  const [channelName, setChannelName] = React.useState('');

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  React.useEffect(() => {
    userCredential();
  }, [user])


  return (
    <SafeAreaView style={{ width: '100%', flex: 1 }}>
      <Text style={styles.selfAlignItem}>Nom d'utilisateur</Text>
        <FormInput
          onChangeText={onChangeUsername}
          value={username != '' ? username : oldUsername}
          placeholder={oldUsername}
          keyboardType="default"
        />
    </SafeAreaView>
  )
}

export default ConversationCreate