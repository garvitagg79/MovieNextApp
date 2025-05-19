import moviesData from "@/assets/data/movies.json";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MovieDetail () {
    const {id} = useLocalSearchParams();
    const movie = moviesData.find((movie) => movie.id.toString() === id);

    if (!movie) {
        return <Text>Movie not found</Text>
    }

    const handlePress = () => {
        Linking.openURL(movie.link).catch((err) => {
            console.error("Failed to open URL:", err);
        })
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView style={{padding: 16}}>
                <Text style={{fontSize: 24, fontWeight: "bold", marginTop: 16}}>{movie.title}</Text>
                <Text style={{fontSize: 14, color: 'gray', marginVertical: 4, marginTop: 8}}>Rating: {movie.rating} | Category: {movie.franchise}</Text>
                <Text style={{fontSize: 14, color: 'gray', marginVertical: 4}}>Release Date: {movie.releaseDate} | Duration: {movie.duration}</Text>

                <Text style={{marginTop: 12}} numberOfLines={5}>{movie.synopsis}</Text>

                <FlatList
                    data={movie.cast}
                    keyExtractor={(item) => item.name}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{marginTop: 16}}
                    renderItem={({item}) => (
                        <View style={{marginRight: 16, alignItems: "center"}}>
                            <Image 
                                source={{uri: item.image}}
                                style={{width: 80, height: 80, borderRadius: 40}}
                            />
                            <Text style={{marginTop: 8, fontSize: 12}} numberOfLines={1}>{item.name}</Text>
                            <Text style={{marginTop: 4, fontSize: 12, color: "gray"}} numberOfLines={1}>{item.role}</Text>
                        </View>
                    )}
                />
            </ScrollView>
            
            <TouchableOpacity style={{position: "absolute", bottom: 20, left: 16, right: 16, backgroundColor: "tomato", padding: 16, borderRadius: 12}} onPress={handlePress}>
                <Text style={{color: "white", textAlign: "center"}}>Open in {movie.platform}</Text>
            </TouchableOpacity>
        </View>
    )
}