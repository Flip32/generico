import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {StatusBar} from "expo-status-bar"
import {useStoreContext} from "../../store"
import {observer, inject} from "mobx-react"

type Props = any

const Home = (props: Props) => {

    const { userData } = useStoreContext()

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
        <View style={styles.container}>
        </View>
    )
}

export default inject('store')(observer(Home));
// export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
