import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    useEffect(() => {
        const startUp = async () => {
            setTimeout(() => {
                setInitialRoute("./screens/home");
            }, 1000)
        }

        startUp()
    }, [])

    if (!initialRoute) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={"black"} />
            </View>
        )
    }

    return <Redirect href={initialRoute as any}/>
}