import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assests/animations/boost.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assests/animations/achieve.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assests/animations/confetti.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: height,
  },
});
