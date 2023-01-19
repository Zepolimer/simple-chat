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

import { 
  getCredentials, 
  regenerateToken 
} from '../../security/Credential';

import BlackPressable from '../../components/BlackPressable';
import FormInput from '../../components/FormInput';
import styles from '../../style/style';


const ConversationCreate = ({ navigation }) =>  {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [channelName, setChannelName] = React.useState('');


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

  React.useEffect(() => {
    userCredential();
  })


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