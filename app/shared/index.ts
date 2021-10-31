import { StyleSheet } from "react-native";


const FontSizes = {
    xSmall: 8,
    small: 10,
    medium: 16,
    large: 20,
    xLarge: 24,
}

const Colors = {
    primary: '#FF9C00',
    secondary: '#000',
    background: '#292929',
    white: '',
    ligthGray: '',
    darkGray: '',
    fontDark: '#000',
    fontLigth: '#FFF',
}

const Styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center',},
    modalContainer: {
        width: '80%',
        height: '78%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(19, 11, 16, 0.95)',
        alignSelf: 'center',
        borderRadius: 10,
        paddingTop: 24,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        position: 'absolute',
        top: '-2%',
        right: '-2%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goBackButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.secondary,
        position: 'absolute',
        top: '2%',
        left: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6
    },
    containerSenhas: {
        flexDirection: 'row', width: '100%', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'
    },
    keyboardAvoidingViewStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        width: '100%',
    },
    input: { backgroundColor: '#F0F0F0' }
})

export { FontSizes, Colors, Styles }
