import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {removeItem} from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  const handlReset = async () => {
    await removeItem('onboarded');
    navigation.push('Onboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottie}>
        <Lottie
          style={{flex: 1}}
          source={require('../assests/animations/confetti.json')}
          autoPlay
          loop
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Todo')}
        style={styles.addTaskButton}>
        <LinearGradient
          style={styles.addTaskButton}
          colors={['#a78bfa', '#fef3c7']}>
          <Text style={styles.addTaskText}>New Task Who's In?</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlReset} style={styles.resetButton}>
        <LinearGradient
          style={styles.resetButton}
          colors={['#a7f3d0', '#ff6347']}>
          <Text style={styles.resetText}>Reset</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fef3cf',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  addTaskButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    margin: 20,
  },
  addTaskText: {
    color: '#ffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 19,
  },
  resetButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    margin: 20,
  },

  resetText: {
    color: '#ffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 19,
  },
});
