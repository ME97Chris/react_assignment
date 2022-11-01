import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Linking} from 'react-native'
import React, {useState, useEffect} from 'react'
import { getMoviesById, getPoster, getLanguage, getVideo} from '../utils/Services/MovieService';
import ItemSeparator from '../Component/ItemSeparator';
import CastCard from '../utils/CastCard';
import MovieCard from '../Component/MovieCard';
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import { FlatList } from 'react-native-gesture-handler';
import { APPEND_TO_RESPOND as AR } from "../utils/api-config";
const {height, width} = Dimensions.get("screen")

const setHeight = (h) => (height/100) * h
const setWidth = (w) => (width/100) * w

const MovieScreen = ({route, navigation}) => {
    const {movieId} = route.params;
    const [movie, setMovie] = useState({});
    const [isCastSelected, setIsCastSelected] = useState(true);

    useEffect(() => {
        getMoviesById(movieId, `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`
        ).then(response => setMovie(response?.data))
    }, []);

    return (
        <ScrollView style={styles.container}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
            start={[0, 0.3]}
            style={styles.linearGradient}
          />
          <View style={styles.moviePosterImageContainer}>
            <Image
              style={styles.moviePosterImage}
              resizeMode="cover"
              source={{ uri: getPoster(movie?.backdrop_path) }}
            />
          </View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={35} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                Share.share({ message: `${movie?.title}\n\n${movie?.homepage}` })
            }
            >
              <Text style={styles.headerText}>Share</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
          >
            <Ionicons name="play-circle-outline" size={70} color={"#fff"} />
          </TouchableOpacity>
          <ItemSeparator height={setHeight(37)} />
          <View style={styles.movieTitleContainer}>
            <Text style={styles.movieTitle} numberOfLines={2}>
              {movie?.original_title}
            </Text>
            <View style={styles.row}>
              <Ionicons name="heart" size={22} color={"red"} />
              <Text style={styles.ratingText}>{movie?.vote_average}</Text>
            </View>
          </View>
          <Text style={styles.genreText}>
            {movie?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
            {movie?.runtime} Min
          </Text>
          <Text style={styles.genreText}>
            {getLanguage(movie?.original_language)?.english_name}
          </Text>
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <Text style={styles.overviewText}>{movie?.overview}</Text>
          </View>
          <View>
            <Text style={styles.castTitle}>Cast</Text>
            <View style={styles.castSubMenuContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setIsCastSelected(true)}
              >
                <Text
                  style={{
                    ...styles.castSubMenuText,
                    color: isCastSelected ? "#000" : "#DDDDDD",
                  }}
                >
                  Cast
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setIsCastSelected(false)}
              >
                <Text
                  style={{
                    ...styles.castSubMenuText,
                    color: isCastSelected ? "#DDDDDD" : "#000",
                  }}
                >
                  Crew
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={{ marginVertical: 5 }}
              data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
              keyExtractor={(item) => item?.credit_id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={() => <ItemSeparator width={20} />}
              ItemSeparatorComponent={() => <ItemSeparator width={20} />}
              ListFooterComponent={() => <ItemSeparator width={20} />}
              renderItem={({ item }) => (
                <CastCard
                  originalName={item?.name}
                  characterName={isCastSelected ? item?.character : item?.job}
                  image={item?.profile_path}
                />
              )}
            />
          </View>
          <Text style={styles.extraListTitle}>Recommended Movies</Text>
          <FlatList
            data={movie?.recommendations?.results}
            keyExtractor={(item) => item?.id?.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
            <MovieCard
                title={item.title}
                language={item.original_language}
                voteAverage={item.vote_average}
                voteCount={item.vote_count}
                poster={item.poster_path}
                size={0.6}
                onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
            )}
        />
          <Text style={styles.extraListTitle}>Similar Movies</Text>
          <FlatList
            data={movie?.similar?.results}
            keyExtractor={(item) => item?.id?.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
                <MovieCard
                    title={item.title}
                    language={item.original_language}
                    voteAverage={item.vote_average}
                    voteCount={item.vote_count}
                    poster={item.poster_path}
                    size={0.6}
                    onPress={() => navigation.navigate("movie", { movieId: item.id })}
                />
            )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#f3f3f3"
    
    },

    moviePosterImageContainer: {
        height: setHeight(35),
        width: setWidth(145),
        alignItems: "center",
        position: "absolute",
        left: setWidth((100 - 145)/2),
        top: 0,
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
        
    },
    moviePosterImage:{
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
        width: setWidth(145),
        height: setHeight(35)
    },
    linearGradient:{
        width: setWidth(100),
        height: setHeight(6),
        position: "absolute",
        top: 0,
        elevation: 9
    }, 

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        position: "absolute",
        right: 0,
        left: 0,
        top: 50,
        elevation: 20,
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    playButton: {
        position: "absolute",
        top: 110,
        left: setWidth(50) - 70 / 2,
        elevation: 10,
    },
    movieTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    movieTitle: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 22,
        width: setWidth(60),
    },
    ratingText: {
        marginLeft: 5,
        color: "#000",
        fontWeight: "bold",
        fontSize: 15,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    genreText: {
        color: "#D2D2D2",
        paddingHorizontal: 20,
        paddingTop: 5,
        fontWeight: "bold",
        fontSize: 13,
    },
    overviewContainer: {
        backgroundColor: "#DDDDDD",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
    },
    overviewTitle: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,
    },
    overviewText: {
        color: "##D2D2D2",
        paddingVertical: 5,
        fontWeight: "bold",
        fontSize: 13,
        textAlign: "justify",
    },
    castTitle: {
        marginLeft: 20,
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,
    },
    castSubMenuContainer: {
        marginLeft: 20,
        flexDirection: "row",
        marginVertical: 5,
    },
    castSubMenuText: {
        marginRight: 10,
        color: "#000",
        fontWeight: "bold",
        fontSize: 13,
    },
    extraListTitle: {
        marginLeft: 20,
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 8,
    },

});

export default MovieScreen