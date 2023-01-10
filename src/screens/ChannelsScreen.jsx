import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { apiGetToken } from '../utils/Api';
import styles from '../style/style';


const ChannelScreen = ({ navigation }) => {
  const [status, setStatus] = React.useState(null)
  const [channels, setChannels] = React.useState(null);

  let userId = 5;
  let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImlhdCI6MTY3MzM1NTQ0NiwiZXhwIjoxNjczMzU5MDQ2fQ.rcwUVu-Ub0oGjICfH5fJvTAaUQ9CZmxGbM_JpLC0Fn0';

  React.useEffect(() => {
    const getChannels = async () => {
      const data = await apiGetToken(`user/${userId}/channel`, userToken);
      
      setStatus(data.status)
      setChannels(data.data);
    }

    getChannels();
  }, [])

  return (
    <View style={styles.viewDisplay}>
    {status == 'Success' && channels != null ? (
      channels.map((channel, index) => {
        return (
          <View key={index}>
            <Pressable 
              style={styles.blackBtn}
              title={channel.id} 
              onPress={console.log('ok')}>
              <Text style={styles.blackBtnText}>
              {channel.name}
              </Text>
            </Pressable>
          </View>
        )
      })
    ) : (
      <Text>Pas de groupe rejoint..</Text>
    )}
  </View>
  )
}

export default ChannelScreen