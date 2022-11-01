import { View, Text, StyleSheet, Image} from 'react-native'
import { getPoster } from "./Services/MovieService";
import React from 'react'
import IMAGES from "./Images";

const CastCard = ({ originalName, image, characterName }) => {
    return (
      <View style={styles.container}>
        <Image
          source={image ? { uri: getPoster(image) } : IMAGES.NO_IMAGE}
          resizeMode={image ? "cover" : "contain"}
          style={styles.image}
        />
        <Text style={styles.originalName} numberOfLines={2}>
          {originalName}
        </Text>
        <Text style={styles.characterName} numberOfLines={2}>
          {characterName}
        </Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      height: 120,
      width: 80,
      borderRadius: 10,
    },
    originalName: {
        width: 80,
        color: "#000",
        fontWeight: "bold",
        fontSize: 12,
    },
    characterName: {
        width: 80,
        color: "#DDDDDD",
        fontWeight: "bold",
        fontSize: 10,
    },
});

export default CastCard