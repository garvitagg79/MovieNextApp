import moviesData from '@/assets/data/movies.json';
import * as Linking from 'expo-linking';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const movie = moviesData.find((m: any) => m.id.toString() === id);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (movie) {
      navigation.setOptions({
        title: movie.title,
      });
    }
  }, [movie])

  if (!movie) return <Text>Movie not found</Text>;


    const handleBook = () => {
        Linking.openURL(movie.link).catch(err => {
            console.error("Failed to open URL:", err);
          });
    };

  return (
    <View className="flex-1">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold mt-4">{movie.title}</Text>
        <Text className="text-sm text-gray-500 mt-2">
          Rating: {movie.rating} | Category: {movie.franchise}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Release Date: {movie.releaseDate} | Duration: {movie.duration}
        </Text>
        <Text className="mt-3">{movie.synopsis}</Text>

        <Text className="text-lg font-semibold mt-6">Cast</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movie.cast}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ marginTop: 8 }}
          renderItem={({ item }) => (
            <View className="mr-4 items-center">
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 80 }}
                className="rounded-full"
              />
              <Text className="text-xs mt-2" numberOfLines={1}>{item.name}</Text>
              <Text className="text-xs mt-2" numberOfLines={1}>{item.role}</Text>
            </View>
          )}
        />
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-4 right-4 bg-red-500 p-4 rounded-xl"
        onPress={handleBook}
      >
        <Text className="text-white text-center font-bold">Open in {movie.platform}</Text>
      </TouchableOpacity>
    </View>
  );
}