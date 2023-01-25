import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LineGraph from './js/components/Chart';

enableScreens();

function HomeScreen() {
  useEffect(() => {
    getData();
    // setInterval(getData(), 180000);
  }, []);

  const [data, setData] = useState({ sensorData: { temp: '', humidity: '' } });

  function getData() {
    fetch('http://192.168.0.115/api/sensors/data/?sensorId=1', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer xMINRgzjA6yzKbTHNzUGx3sk5BzI0q`
      },
      method: 'GET',
    })
      .then((resp) => {
        switch (resp.status) {
          case 200:
            return resp.json();
          default:
            throw resp;
        }
      })
      .then((json) => {
        let results = json.results;
        if (results) {
          setData({
            sensorData: {
              temp: results.filter((a, b) => a.name == 'temperature'),
              humidity: results.filter((a, b) => a.name == 'humidity'),
            },
          });
        }
      }).catch(error => console.error(error));
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <LineGraph name={"Temperature"} domain={{ y: [20, 30] }} data={data.sensorData.temp} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    return Object.entries({ ...screens }).map(
      ([key, { name, component, options }]) => {
        return (
          <AppTabNav.Screen
            key={name}
            name={name}
            component={component}
            options={{ ...options }}
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
              options={{ headerShown: false }}
            />
          )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
