import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import {useEffect, useState} from 'react';
import {getItem} from '../utils/asyncStorage';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [shownOnboarding, setShownOnboarding] = useState(null);
  const checkIfAlreadyOnborded = async () => {
    let onborderded = await getItem('onboarded');
    if (onborderded == 1) {
      setShownOnboarding(false);
    } else {
      setShownOnboarding(true);
    }
  };
  useEffect(() => {
    checkIfAlreadyOnborded();
  }, []);

  if (setShownOnboarding == null) {
    return;
  }

  if (shownOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboard">
          <Stack.Screen
            name="Onboard"
            options={{headerShown: false}}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Todo"
            options={{headerShown: false}}
            component={TodoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Onboard"
            options={{headerShown: false}}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Todo"
            options={{headerShown: false}}
            component={TodoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Router;
