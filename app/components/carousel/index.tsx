import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PagerView from 'react-native-pager-view'

type Props = {

}

const Carousel = (props: Props) => {

    const { } = props

    return (
        <PagerView style={styles.container} initialPage={0}>
            <View key="1">
                <Text style={{color: '#FFF'}}>First page</Text>
            </View>
            <View key="2">
                <Text style={{color: '#FFF'}}>Second page</Text>
            </View>
        </PagerView>
    )
}

export default Carousel;

const styles = StyleSheet.create({
    container: {flex: 1, marginHorizontal: 0, paddingVertical: 20, backgroundColor: '#000'},
})
