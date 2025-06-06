import moviesData from "@/assets/data/movies.json";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const {width} = Dimensions.get("window");
const CARD_WIDTH = (width-48) / 2;

export default function HomeScreen() {
    const router = useRouter();

    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const uniqueFranchises = useMemo(() => {
      const set = new Set(moviesData.map((movie) => movie.franchise));
      return Array.from(set);
    }, []);

    const filteredMovies = useMemo(() => {
      if (!selectedFilter) return moviesData;
      return moviesData.filter((movie) => movie.franchise === selectedFilter);
    }, [selectedFilter]);

    return (
      <View className="pt-6"> 
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 pb-4 items-center"
        >
          <TouchableOpacity
            onPress={() => setSelectedFilter(null)}
            className={`px-4 py-2 mr-2 rounded-full ${
              selectedFilter === null ? "bg-black" : "bg-white"
            }`}
          >
            <Text className={`text-sm ${selectedFilter === null ? "text-white" : "text-black"}`}>
              All
            </Text>
          </TouchableOpacity>

          {uniqueFranchises.map((franchise) => (
            <TouchableOpacity
              key={franchise}
              onPress={() => setSelectedFilter(franchise)}
              className={`px-4 py-2 mr-2 rounded-full ${
                selectedFilter === franchise ? "bg-black" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${
                  selectedFilter === franchise ? "text-white" : "text-black"
                }`}
              >
                {franchise}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
    )
}