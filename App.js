import { StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {firebase} from './firebase-config';
import HomeScreen from './screens/home';
import Login from './Component/auth/Login';
import Registration from './Component/auth/Registration';
import MovieScreen from './screens/MovieScreen';
import Constants from './utils/Constants';
import React, {useState, useEffect} from 'react';
import {AntDesign, FontAwesome, Ionicons, Feather} from "@expo/vector-icons";

const Stack = createStackNavigator();

function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
  //       <Stack.Screen name = "Home" component = {HomeScreen} options = {headersStyle}/>
  //       <Stack.Screen name = "Movie" component = {MovieScreen} options = {{headerShown: false}}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // )
  
  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false)
}

  useEffect(() => {
    const users = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return users;
  }, []);

  if (initializing) return null;

  if (!user){
    return(
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options = {{headerShown: false}}/>
        <Stack.Screen name = "Registration" component = {Registration} options = {{headerShown: false}}/>
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name = "Home" component = {HomeScreen} options = {headersStyle}/>
      <Stack.Screen name = "Movie" component = {MovieScreen} options = {{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const headersStyle = {
  title: "Movies",
  headerStyle: {backgroundColor: Constants.baseColor},
  headerTitleStyle: {color: Constants.textColor},
  headerLeft: () => <Feather name="menu" size={30} color={Constants.textColor}/>,
  headerRight: () => <Feather name="search" size={30} color={Constants.textColor}/>
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );
}