import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                borderTopWidth: 1,
                borderTopColor: "#ccc",
            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: "black"
                    },
                    tabBarIcon: ({focused} : {focused: boolean}) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={25}/>
                    )
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: "black"
                    },
                    tabBarIcon: ({focused} : {focused: boolean}) => (
                        <Ionicons name={focused ? 'globe' : 'globe-outline'} size={25}/>
                    )
                }}
            />
        </Tabs>
    )
}