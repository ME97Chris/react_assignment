import { Text, TouchableOpacity, TextInput, View, Button, StyleSheet, Image} from 'react-native'
import React, { useState } from 'react'
import {firebase} from '../../firebase-config'
import { useNavigation } from '@react-navigation/native'
import logo from '../../assets/icons/Logo.png'

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async (email, password) => {

      try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
      }
      catch(err){
        console.log(err)
      }
    }

    return (
      <View style={styles.container}>
        <Image source={logo} resizeMode="stretch" style={{height:80, width: 50}} />
        <Text style={{fontWeight: 'bold', fontSize:26}}>
          Login
        </Text>
        <View style={{marginTop:40}}>
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"/>
          <TextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Password"/>
        </View>
        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          style={styles.Button}>
          <Text style={{fontWeight: "bold", fontSize:20}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Registration')}
          style={{marginTop: 20}}>
          <Text style={{fontWeight: "bold", fontSize:14}}> No Account? Register</Text>
        </TouchableOpacity>
      </View>

    )

}

export default Login

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      marginTop: 100,
      alignItems: 'center',
    },
    input: {
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 20,
        borderBottomColor: '#000',
        width: 400,
        borderBottomWidth: 1,
        textAlign: 'center',
  },

  Button: {
      marginTop: 50,
      width: 250,
      height: 70,
      backgroundColor: '#AB0010',
      alignItems: 'center',
      borderRadius: 50,
      justifyContent: 'center',

  }
})
