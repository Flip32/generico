import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import { Colors, Styles } from "../../shared";
import Login from "./Login";

const AuthPage = () => {

    useEffect(() => {
        async function inicia() {
            await load()
        }

        inicia().then(() => {
        })
        return () => {
        }
    }, [])

    async function load() {

    }

    return (
        <View style={[ Styles.container, { backgroundColor: Colors.background, }]}>
            <KeyboardAvoidingView
                enabled={Platform.OS === "ios"}
                keyboardVerticalOffset={20}
                behavior={"padding"}
                style={Styles.keyboardAvoidingViewStyle}
            >
                <View style={{ marginBottom: 20, alignSelf: 'center'}}>
                    {/*<Image source={require('../../../assets/logo-login.png')} />*/}
                </View>
                <Login />
            </KeyboardAvoidingView>
        </View>
    )
}

export default AuthPage;
