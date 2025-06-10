import moviesData from "@/assets/data/movies.json";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View, ScrollView } from "react-native";


const {width} = Dimensions.get("window");
const CARD_WIDTH = (width-48) / 2;

export default function ExploreScreen() {
    const router = useRouter();

    const topCategories = useMemo(() => {
        const categoryCount = new Map<string, number>();

        moviesData.forEach((movie) => {
            const categories = movie.category?.split("#") || [];
            categories.forEach((cat) => {
                categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1);
            })
        })

        const sortedCategories = Array.from(categoryCount.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([name]) => ({ name}));
        return sortedCategories;
    }, [moviesData])

    const newlyReleased = useMemo(() => {
        return [...moviesData].filter((movie) => movie.status.toLowerCase() !== "coming soon").sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 10);
    }, [moviesData])

    return (
        <ScrollView className="pt-6 pb-8" showsVerticalScrollIndicator={false}>
            <Text className="text-3xl font-bold pl-4 mb-4">Explore Movies</Text>

            <View className="flex-row flex-wrap px-4">
                {topCategories.map((category, index) => (
                    <TouchableOpacity
                        key={`category-${index}`}
                        onPress={() => router.push(`/detailScreens/category/${category.name}`)}
                        className={`bg-gray-200 rounded-xl p-4 w-[48%] items-center mb-4 ${index % 2 === 0 ? 'mr-[4%]' : ''}`}
                    >
                        <Text className="text-lg font-semibold">{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text className="text-2xl font-semibold p-4 mb-2 ml-2">Newly Released</Text>
            <View className="flex-row flex-wrap px-4">
                {newlyReleased.map((item, index) => (
                    <TouchableOpacity key={`movie-${item.id}-${index}`} className="w-[48%] mr-[4%] mb-6" style={index % 2 !== 0 ? {marginRight: 0} : undefined} onPress={() => router.push(`/detailScreens/movie/${item.id}`)}>
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
                ))}
            </View>
            
        </ScrollView>
    )
}

