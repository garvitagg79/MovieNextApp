import moviesData from "@/assets/data/movies.json";
import { useRouter } from "expo-router";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const {width} = Dimensions.get("window");
const CARD_WIDTH = (width-48) / 2;

export default function HomeScreen() {
    const router = useRouter();

    return (
        <FlatList
            data={moviesData}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{padding: 16}}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 24}}
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
                </TouchableOpacity>
            )}
        />
    )
}

