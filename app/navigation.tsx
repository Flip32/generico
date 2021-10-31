import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { inject, observer } from "mobx-react"

//Pages
import AuthPage from "./pages/auth";
import Home from "./pages/home";
import MusicPage from "./pages/musics";


const Stack = createNativeStackNavigator()

const AppNavigator = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Auth"} component={AuthPage} options={{ title: 'Login' }} />
                <Stack.Screen name={"Home"} component={Home} options={{ title: 'Inicial' }} />
                <Stack.Screen name={"MusicPage"} component={MusicPage} options={{ title: 'Músicas' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default inject('store')(observer(AppNavigator));
