import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {firebase} from '../../firebase-config'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  registerUser = async (email, password, firstName, lastName) => {
    
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() =>{
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://reactassignment-1ca5c.firebaseapp.com',
        })
        .then(()=>{
          alert('Verification email sent')
        }).catch((error)=>{
          alert(error.message)
        })
        .then(()=>{
          firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({firstName, lastName, email})
        })
        .catch((error) => {
          alert(error.message)
        })
      })
      .catch((error) => {
        alert(error.message)
      })
  }  
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 23}}>
      Register
      </Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(firstName)=> setFirstName(firstName)}
          autoCorrect={false}
          />
          <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(lastName)=> setLastName(lastName)}
          autoCorrect={false}
          />
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
          onPress={() => registerUser(email, password, firstName, lastName)}
          style={styles.Button}>
          <Text style={{fontWeight: "bold", fontSize:20}}>Register</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Registration

styles = StyleSheet.create({
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

