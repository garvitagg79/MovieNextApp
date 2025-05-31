import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
export default function DetailScreenLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true
        }}>
            <Stack.Screen name="movie/[id]" options={{
                headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
              headerLeft: () => {
                const navigation = useNavigation();
                return (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                )
              }  
            }}/>
        </Stack>
    )
}