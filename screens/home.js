import { View, 
  Text,
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  FlatList, 
  TouchableWithoutFeedback} from 'react-native'
import React, {useState, useEffect} from 'react'
import {AntDesign, FontAwesome, Ionicons, Feather} from "@expo/vector-icons";
import GenreCardView from '../Component/GenreCardView';
import ItemSeparator from '../Component/ItemSeparator';
import MovieCard from '../Component/MovieCard';
import Constants from '../utils/Constants';
import { getNowPlaying, getUpcoming, getAllGenres} from '../utils/Services/MovieService';

const Home = ({navigation}) => {

  const [activeGenre, setActiveGenre] = useState("All");
  const [nowPlaying, setNowPlaying] = useState({});
  const [upcoming, setUpcoming] = useState({});
  const [genres, setGenres] = useState([{id: 10110, name: "All"}]);

  useEffect(() => {
    getNowPlaying().then((movieResponse) => setNowPlaying(movieResponse.data)
    );
    getUpcoming().then((movieResponse) => setUpcoming(movieResponse.data)
    );
    getAllGenres().then((genreResponse) => setGenres([...genres, ...genreResponse.data.genres])
    );
  },[])

  return (
      <View options={headersStyle}/>,
      <ScrollView style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>View All</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList 
          data={genres} 
          horizontal 
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator= {false}
          ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20}/>}
          ListFooterComponent={() => <ItemSeparator width={20}/>}
          renderItem= {({item}) => (<GenreCardView genreName={item.name} 
          active={item.name === activeGenre ? true : false }
          onPress={setActiveGenre}
          />
          )}
          />
      </View>
      <View>
        <FlatList
          data={nowPlaying.results}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20}/>}
          ListFooterComponent={() => <ItemSeparator width={20}/>}
          renderItem= {({item}) => (<MovieCard 
          title={item.title}
          language={item.original_language} 
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          poster={item.poster_path}
          heartLess={false}
          onPress={() => navigation.navigate("Movie", {movieId: item.id})}
          />)}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Movies</Text>
        <Text style={styles.headerSubTitle}>View All</Text>
      </View>
      <View>
        <FlatList
          data={upcoming.results}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20}/>}
          ListFooterComponent={() => <ItemSeparator width={20}/>}
          renderItem= {({item}) => (<MovieCard 
          title={item.title}
          language={item.original_language} 
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          poster={item.poster_path}
          size={0.7}
          onPress={() => navigation.navigate("Movie", {movieId: item.id})}
          />)}
        />
      </View>
      </ScrollView>
  );
};

const headersStyle = {
  title: "Movies",
  headerStyle: {backgroundColor: Constants.baseColor},
  headerTitleStyle: {color: Constants.textColor},
  headerLeft: () => <Feather name="menu" size={30} color={Constants.textColor}/>,
  headerRight: () => <Feather name="search" size={30} color={Constants.textColor}/>
 }

export default Home

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF',
    },
  header: {
    alignItems: 'center',
    justifyContent:'space-between', 
    padding: 10,
    flexDirection: 'row',

    },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    //fontFamily: 'Regular',
    color: "#AB0010"
  },

  headerSubTitle: {
    fontSize: 14,
    color: "#FF838F",
  },

  genreListContainer: {
    paddingVertical: 10,
  }
  
  })