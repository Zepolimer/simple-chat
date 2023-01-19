import * as React from 'react'
import { 
  SafeAreaView,
  View, 
  ScrollView, 
  Pressable, 
  Text, 
} from 'react-native';

import { securePostRequest } from '../../security/Api';

import { 
  getCredentials, 
  regenerateToken 
} from '../../security/Credential';

import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';
import BlackPressable from '../../components/button/BlackPressable';
import FormInput from '../../components/input/FormInput';

import styles from '../../style/style';


const ChannelCreate = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [name, setName] = React.useState('');
  const [privacy, setPrivacy] = React.useState(false);

  const [status, setStatus] = React.useState(null);


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

  const handlePrivacy = async () => {
    setPrivacy(!privacy);
  }

  const createChannel = async () => {
    if(name != ''){
      let newChannel = {
        'name': name,
        'private': privacy,
      }

      await securePostRequest(
        `user/${user}/channel`, 
        newChannel,
        access,
      )
      .then((res) => {
        setStatus(res.status)
        if(res.status != 'Error') {
          navigation.navigate('ChannelUsers', {
            id: res.data.id,
            name: res.data.name,
          })
        }
      });
    }
  }

  React.useEffect(() => {
    userCredential();

    if(status == 'Error') {
      regenerateToken(refresh);
    } 
  })


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeaderGoBack 
        goBack={() => navigation.goBack()}
      />

      <View style={styles.viewChat}>
        <Text style={styles.title}>Vous pouvez créer un groupe depuis cette page.</Text>
        <Text style={styles.title}>1. Veuillez renseigner le nom que portera votre groupe. Celui-ci sera ensuite éditable si besoin.</Text>
        <Text style={styles.title}>2. Veuillez indiquer si votre groupe est visible par tous les utilisateurs ou uniquement les utilisateurs invités par vos soins.</Text>
        <Text style={styles.title}>3. Une fois la création effectuée et enregistrée, vous serez redigiré vers une page permettant d'ajouter des utilisateurs à votre groupe.</Text>
      </View>
      <View style={styles.whiteCard}>
        <Text style={styles.selfAlignItem}>Nom de votre groupe :</Text>
        <FormInput
          onChangeText={setName}
          value={name}
          placeholder={'Saisir ici ...'}
          keyboardType="default"
        />

        <View style={styles.flexRowBetween}>
          <Text>Cochez cette case si vous souhaitez que votre groupe soit en privé :</Text>
          <Pressable 
            style={privacy ? styles.checkboxChecked : styles.checkbox}
            onPress={() => handlePrivacy()}
          />
        </View>

        <BlackPressable 
          title={'Enregistrer'}
          onPress={createChannel}
          text={'Enregistrer'}
        />
      </View>
    </SafeAreaView>
  )
}

export default ChannelCreate