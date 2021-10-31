import { Alert, Linking } from "react-native"
// @ts-ignore
import VersionCheck from 'react-native-version-check-expo'
import * as Device from 'expo-device'
import React, { useEffect } from "react"
import { Provider } from "mobx-react"
import { DefaultTheme, Provider as Paper } from "react-native-paper"

import store from './store'
import Extensions from './extensions'
import Home from "./pages/home"
import AppNavigator from "./navigation";

const idAppleStore = ''
const idGoogleStore = 'br.com.fithit.m'

Extensions()

const LoaderApp = () => {

    const theme = {
        ...DefaultTheme,
        roundness: 4,
        colors: {
            ...DefaultTheme.colors,
            primary: '#3498db',
            accent: '#f1c40f',
            text: 'rgba(95, 115, 139, 0.8)',
            background: '#FFFFFF00'
        },
    };

    useEffect(() => {
        (async () => {
            await checkVersion()
        })()
    }, [])

    const checkVersion = async () => {
        // TODO - Remover apos publicacao
        return;
        const activeV = await VersionCheck.getCurrentVersion();
        const version = await VersionCheck.getLatestVersion();
        if (Device.brand == 'Apple') {
            if (version != activeV && !__DEV__) Alert.alert('Aviso FIT HIT', 'Há uma nova versão deste App disponível na App Store.', [
                {
                    text: "Depois",
                    onPress: () => console.log('Cancelado'),
                    style: "cancel"
                },
                {
                    text: "Ver",
                    onPress: () => Linking.openURL(`https://apps.apple.com/br/app/fithit/${idAppleStore}`)
                }
            ])
        } else {
            if (version != activeV && !__DEV__) Alert.alert('Aviso FIT HIT', 'Há uma nova versão deste App disponível no Google Play.', [
                {
                    text: "Depois",
                    onPress: () => console.log('Cancelado'),
                    style: "cancel"
                },
                {
                    text: "Ver",
                    onPress: () => Linking.openURL(`https://play.google.com/store/apps/details?id=${idGoogleStore}`)
                }
            ])
        }
    }

    return (
        <Provider store={store}>
            <Paper theme={theme}>
                <AppNavigator />
            </Paper>
        </Provider>
    )
}

export default LoaderApp


/*
app.json
{
    "expo": {
    "name": "FITHIT",
        "slug": "expo-fithit",
        "owner": "Patricio",
        "platforms": [
        "android",
        "ios"
    ],
        "backgroundColor": "#FF0000",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "splash": {
        "image": "./assets/splash.png",
            "resizeMode": "cover",
            "backgroundColor": "#ffffff"
    },
    "updates": {
        "enabled": true,
            "checkAutomatically": "ON_LOAD",
            "fallbackToCacheTimeout": 60000
    },
    "assetBundlePatterns": [
        "**!/!*"
    ],
        "ios": {
        "appStoreUrl": "https://apps.apple.com/br/app/fithit/id000001",
            "bundleIdentifier": "br.com.fithit.m",
            "googleServicesFile": "./GoogleService-Info.plist",
            "buildNumber": "0",
            "icon": "assets/icon_ios.png",
            "supportsTablet": false,
            "userInterfaceStyle": "automatic",
            "usesIcloudStorage": true,
            "infoPlist": {
            "NSPhotoLibraryUsageDescription": "Permita usar a galeria de fotos para tramitar documentos",
                "NSFaceIDUsageDescription": "Permita usar o FaceID para fazer o Login"
        }
    },
    "androidStatusBar": {
        "barStyle": "light-content"
    },
    "android": {
        "playStoreUrl": "https://play.google.com/store/apps/details?id=br.com.fithit.m",
            "allowBackup": false,
            "versionCode": 10001,
            "package": "br.com.fithit.m",
            "googleServicesFile": "./google-services.json",
            "icon": "assets/icon_android.png",
            "adaptiveIcon": {
            "backgroundColor": "#1B4B90"
        },
        "permissions": [
            "READ_EXTERNAL_STORAGE",
            "WRITE_EXTERNAL_STORAGE",
            "USE_FINGERPRINT",
            "USE_BIOMETRIC"
        ]
    },
    "web": {
        "config": {
            "firebase": {
                "apiKey": "AAquiVaiAchaveDoFirebase123",
                    "measurementId": "G-00001"
            }
        }
    }
}
}
*/

