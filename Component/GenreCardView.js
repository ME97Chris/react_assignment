import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const {height, width} = Dimensions.get('window')

const setWidth = (w) => (width/100) * w;

const GenreCardView = ({genreName, active, onPress}) => {
    
    return (
    <TouchableOpacity style={{...styles.container, 
    backgroundColor: active ? "#F50017" : "#FFF"}} 
    activeOpacity= {0.5} 
    onPress = {() => onPress(genreName)} >
      <Text style={{...styles.genreText,
       color: active ? "#FFF" : "#000"}}>{genreName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffdbd8',
    borderRadius: 5,
    marginVertical: 5,
    elevation: 5,
    width: setWidth(25),
    height: 48
    },
    genreText:{
        fontSize: 14,
    }
})

export default GenreCardView