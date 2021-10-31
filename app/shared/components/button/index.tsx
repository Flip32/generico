import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { FontSizes, Colors } from '../../index';
import { IconButton } from "react-native-paper";

type IconType = {
    name: string
    size: number
    color: string
}

type ButtonType = 'text' | 'solid' | 'outlined'

type Props = {
    onPress: Function
    title: string
    type: ButtonType
    buttonColor?: string
    textColor?: string
    backgroundStyle?: ViewStyle
    disabled?: boolean
    icon?: IconType
}

const Button = (props: Props) => {
    const { onPress, title = 'Texto Default', buttonColor = Colors.primary, textColor = '#FFF', backgroundStyle = {}, disabled = false, type } = props
    const icon = useState(props.icon)[0]

    const bStyle = type === 'text'
        ? {}
        : { backgroundColor: (type === 'outlined') ? 'transparent' : buttonColor, opacity: disabled ? 0.5 : 1, borderColor: buttonColor, borderWidth: 3 }

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={() => onPress()}
            style={[styles.button, bStyle, backgroundStyle]}
        >
            <Text style={[ styles.text, { color: textColor}]} > { title } </Text>
            {
                icon &&
                <IconButton size={icon.size} color={icon.color} icon={icon.name} style={{ alignSelf: 'flex-start' }} />
            }
        </TouchableOpacity>
    )
}

export { Button };

const styles = StyleSheet.create({
    container: {flex: 1},
    button: { width: '70%', paddingVertical: 12, justifyContent: 'center', alignItems: 'center', borderRadius: 8, flexDirection: 'row' },
    text: { fontSize: FontSizes.medium, fontWeight: 'bold' }
})
