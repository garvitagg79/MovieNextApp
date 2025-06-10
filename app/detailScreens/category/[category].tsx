import moviesData from '@/assets/data/movies.json';
import * as Linking from 'expo-linking';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect, useMemo } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';

const {width} = Dimensions.get("window");
const CARD_WIDTH = (width-48) / 2;
export default function MovieDetail() {
    const router = useRouter();
  const params = useLocalSearchParams();
  const category = params.category as string;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (category) {
      navigation.setOptions({
        title: category,
      });
    }
  }, [category])

  if (!category) return <Text>Category not found</Text>;

  const filteredMovies = useMemo(() => {
    if (!category) return [];

    return moviesData.filter((movie) => {
      const categories = movie.category?.split("#") || [];
      return categories.includes(category);
    });
  }, [category, moviesData])

  return (
    <View className="flex-1">
     <FlatList
                data={filteredMovies}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                contentContainerClassName="p-4 "
                columnWrapperClassName="flex-row justify-between mb-6"
                
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{width: CARD_WIDTH}} onPress={() => router.push(`/detailScreens/movie/${item.id}`)}>
                        <View className="relative">
                            <Image
                                source={{ uri: item.poster }}
                                style={{
                                    width: CARD_WIDTH,
                                    height: CARD_WIDTH * 1.5,
                                }}
                                className="rounded-lg"
                                resizeMode="cover"
                            />
                            <View className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded-lg">  
                                <Text className="text-white">{item.rating}</Text>
                            </View>
                            <View className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-lg">  
                                <Text className="text-white">{item.franchise}</Text>
                            </View>
                            <View
                            className="absolute bottom-0 w-full px-2 py-2 bg-black/60 rounded-lg"
                            >
                                <Text className="text-white text-center">{item.status}</Text>
                            </View>
                        </View>
                        <Text className="mt-2 text-center font-semibold">{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
    </View>
  );
}