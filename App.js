import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LineGraph from './js/components/Chart';

enableScreens();

function HomeScreen() {
  useEffect(() => {
    getData();
    // setInterval(getData(), 180000);
  }, []);

  const [data, setData] = useState({sensorData: {temp: '', humidity: ''}});

  function getData() {
    fetch('http://192.168.0.107:8000/api/sensors/data/', {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        setData({
          sensorData: {
            temp: json.filter((a, b) => a.name == 'temperature'),
            humidity: json.filter((a, b) => a.name == 'humidity'),
          },
        });
      });
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <LineGraph domain={{y: [20, 30]}} data={data.sensorData.temp} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login</Text>
    </View>
  );
}

export default function App() {
  const RootStack = createStackNavigator();
  const AppTabNav = createBottomTabNavigator();

  const AuthScreens = {
    Login: {
      name: 'Login',
      component: LoginScreen,
      options: {
        headerShown: false,
      },
    },
  };

  const AppScreens = {
    Home: {
      name: 'Home',
      component: HomeScreen,
      options: {
        headerShown: true,
      },
    },
    Settings: {
      name: 'Settings',
      component: SettingsScreen,
      options: {
        headerShown: false,
      },
    },
  };

  const createScreens = (screens) => {
    return Object.entries({...screens}).map(
      ([key, {name, component, options}]) => {
        return (
          <AppTabNav.Screen
            key={name}
            name={name}
            component={component}
            options={{...options}}
          />
        );
      },
    );
  };

  let tabScreens = createScreens(AppScreens);

  const TabNav = () => <AppTabNav.Navigator>{tabScreens}</AppTabNav.Navigator>;
  let isSignedIn = true;

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isSignedIn ? (
          <RootStack.Screen name="App" component={TabNav} />
        ) : (
          <RootStack.Screen
            name={'Login'}
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
