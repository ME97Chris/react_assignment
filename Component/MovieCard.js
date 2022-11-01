import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, TouchableNativeFeedback} from 'react-native'
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import Images from '../utils/Images';
import React, {useState} from 'react'
import { getPoster } from '../utils/Services/MovieService';

const MovieCard = ({title, language, poster, voteAverage, voteCount, size, heartLess, onPress}) => {

    const [liked, setLiked] = useState(false)
    const [voteCountValue, setVoteCountValue] = useState(voteCount)

    return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <ImageBackground style={{...styles.container, width: 240 * size, height: 370 * size}}
        imageStyle ={{borderRadius: 12}}
        source={{uri: getPoster(poster)}}>
            <View style={{...styles.imdbContainer, paddingVertical: 3 * size}}>
                <Image source={Images.IMDB} resizeMode="cover" 
                style={{...styles.imdbImage, height: 30 * size, width: 55 * size}}/>
                <Text style={{...styles.ratingText, marginRight: 2 * size, fontSize: 14 * size}}>{voteAverage}</Text>
            </View>
            {!heartLess ? (
                <TouchableNativeFeedback onPress={() => {
                    setLiked(!liked);
                    setVoteCountValue(liked ? voteCount - 1 : voteCountValue + 1);
                }}>
                    <Ionicons name= {liked ? "heart" : "heart-outline"} size= {25 * size} 
                    color= {liked ? "Red" : "#fff"}
                    style={{ position: "absolute",
                            bottom: 10, right: 10}}/>
                </TouchableNativeFeedback>
            ) : null}
        </ImageBackground>
        <View>
            <Text style={{...styles.movieTitle, width: 230 * size}} numberOfLines={3}>
                {title}
            </Text>
            <View style={styles.movieSubTitleContainer}>
                <Text style={styles.movieSubTitle}>
                    {language}
                </Text>
                    <View style={styles.position}>
                        <Ionicons name= "heart" size= {24 * size} color= "red"/>
                        <Text style={styles.movieSubTitle}>
                            {voteCountValue}
                        </Text>
                    </View>
            </View>
        </View>
    </TouchableOpacity>
    )
}

export default MovieCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AB0010',
        width: 240,
        height: 370,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 5
    },

    movieTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 2,
        marginTop: 5,
        color: 'black',
        width: 240
    },

    movieSubTitleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },

    movieSubTitle: {
        fontSize: 16,
        color: 'black'
    },

    position: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    imdbContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#FFC410',
        borderTopLeftRadius: 12,
        borderBottomEndRadius: 4,
        paddingVertical: 3,
    
    },
    imdbImage:{
        paddingStart: 2,
        height: 30,
        width: 55
    },

    ratingText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#AB0010",
        paddingEnd: 3
    }
});

MovieCard.defaultProps = {
        size: 1,
        heartLess: true,
};