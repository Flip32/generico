import React, { useState, useRef} from 'react';
import { inject, observer } from "mobx-react";
import { Linking, View } from 'react-native';
import { TextInput, IconButton, HelperText, ActivityIndicator, Portal, Modal, Paragraph } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from 'yup'
import { Colors, Styles, FontSizes } from "../../../shared";
import { Button } from "../../../shared/components/button";
import { login, recoverPassword } from "../../../services";
import { useStoreContext } from "../../../store";
import  { useNavigation } from "@react-navigation/native";

const Login = () => {

    let { userData } = useStoreContext()
    const { navigate } = useNavigation()

    const email = useRef(null)
    const pass = useRef(null)
    const [showPass, setShowPass] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingREcoverPass, setLoadingREcoverPass] = useState(false)
    const [showModalRecoverPass, setShowModalRecoverPass] = useState(false)
    const [msgRecover, setMsgRecover] = useState<string | undefined>(undefined)

    const formSchema = Yup.object().shape({
        email: Yup.string().email('É necessário um email válido').required('Campo Obrigatório'),
        pass: Yup.string().min(6, 'A senha deve ter pelo menos 6 digitos').required('Campo Obrigatório'),
    })
    const formRecoverPassword = Yup.object().shape({
        emailRecover: Yup.string().email('É necessário um email válido').required('Campo Obrigatório'),
    })

    async function handleSubmit(values: any, actions: any){
        setLoading(true)
        const data = {email: values.email, pass: values.pass}
        try {
            await login(data, (user: any) => {
                setLoading(false)
                if(user){
                    actions.resetForm()
                    userData = user
                    // @ts-ignore
                    navigate('Home')
                }
            })
        } catch (e){
            console.log('Erro ao tentar logar!', e)
            actions.resetForm()
            setLoading(false)
        }
    }

    async function resetPassword(values: any, actions: any){
        setLoadingREcoverPass(true)
        console.log('email recovery => ', values.emailRecover)
        const { emailRecover } = values
        try{
            await recoverPassword(emailRecover, () => {
                setMsgRecover('Você receberá instruções, para recuperar a senha, no email. Caso este seja um email cadastro.')
                actions.resetForm()
                setLoadingREcoverPass(false)
            })

        } catch (e) {
            console.log('Deu ruim ao tentar resetar a senha')
            setMsgRecover('Houve algum problema. Tenta mais tarde ou use outro email.')
            actions.resetForm()
            setLoadingREcoverPass(false)
        }

    }

    function handleRedirect(){
        // Linking.openURL('')
    }

    return (
        <>
            <View style={{width: '100%'}}>
                <Formik initialValues={{email: '', pass: ''}}
                        onSubmit={(values: any, actions: any) => handleSubmit(values, actions)} validationSchema={formSchema}
                        style={{flex: 1}}>
                    {
                        ({values, handleChange, handleSubmit, errors, touched, setFieldTouched}) => (
                            <View style={{paddingHorizontal: 40, paddingVertical: 20}}>
                                <TextInput
                                    mode={'outlined'}
                                    ref={email}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    style={[Styles.input, {marginBottom: 10}]}
                                    placeholderTextColor='purple'
                                    label={'Email'}
                                    keyboardType={'email-address'}
                                    onBlur={() => setFieldTouched('email')}
                                />
                                {
                                    errors.email && touched.email &&
                                    <HelperText type={'error'}>{errors.email}</HelperText>}
                                    <View style={Styles.containerSenhas}>
                                        <TextInput
                                            mode={'outlined'}
                                            ref={pass}
                                            value={values.pass}
                                            onChangeText={handleChange('pass')}
                                            style={[Styles.input, {marginBottom: 10, flex: 1}]}
                                            placeholderTextColor='purple'
                                            label={'Senha'}
                                            textContentType={"password"}
                                            secureTextEntry={showPass}
                                            onBlur={() => setFieldTouched('pass')}
                                        />
                                        <IconButton
                                            icon={showPass ? 'eye-off-outline' : 'eye'}
                                            onPress={() => setShowPass(!showPass)}
                                            style={{position: 'absolute', right: 0, top: 10}}
                                        />
                                    </View>
                                    {errors.pass && touched.pass && <HelperText type={'error'}>{errors.pass}</HelperText>}
                                    <Button onPress={handleSubmit} buttonColor={Colors.primary} title={'Entrar'} type={"solid"}
                                            backgroundStyle={{alignSelf: 'center', width: '100%', marginTop: 20}}/>
                                    <Button onPress={handleRedirect} buttonColor={Colors.fontLigth} title={'Não possui conta?'} type={"outlined"}
                                            backgroundStyle={{alignSelf: 'center', width: '100%', marginTop: 20}}/>
                                    <Button onPress={() => setShowModalRecoverPass(true)} type={"text"}
                                            buttonColor={Colors.fontLigth} title={'Resetar Senha'}
                                            backgroundStyle={{alignSelf: 'center', width: '100%', marginTop: 20}}
                                    />
                            </View>
                        )
                    }
                </Formik>
            </View>
            <Modal visible={loading} >
                <ActivityIndicator size={'large'} color={Colors.primary}/>
            </Modal>

            <Portal>
                <Modal visible={showModalRecoverPass} onDismiss={() => setShowModalRecoverPass(false)}>
                    {
                        loadingREcoverPass && <ActivityIndicator size={'large'} color={'#151845'}/>
                    }

                    {/* TODO - Arrumar bug do keyboarAvoidingView do fundo */}
                    <View style={{
                        backgroundColor: Colors.background,
                        alignSelf: 'center',
                        marginHorizontal: 10,
                        height: '70%',
                        borderRadius: 8
                    }}>

                        {
                            !loadingREcoverPass && !msgRecover &&
                            <View style={{paddingHorizontal: 40, paddingVertical: 20, justifyContent: 'space-around'}}>
                                <Paragraph children={'Digite seu email para recuperar a senha'}
                                           style={{fontSize: FontSizes.large, textAlign: 'center'}}/>
                                <Formik initialValues={{emailRecover: ''}}
                                        onSubmit={(values, actions) => resetPassword(values, actions)}
                                        validationSchema={formRecoverPassword}>
                                    {
                                        ({handleSubmit, handleChange, values, errors, touched, setFieldTouched}) => (
                                            <>
                                                <TextInput
                                                    mode={'outlined'}
                                                    value={values.emailRecover}
                                                    onChangeText={handleChange('emailRecover')}
                                                    style={[Styles.input, {marginBottom: 10}]}
                                                    placeholderTextColor='purple'
                                                    label={'Email Cadastrado'}
                                                    keyboardType={'email-address'}
                                                    onBlur={() => {
                                                        setFieldTouched('emailRecover')
                                                    }}
                                                />
                                                {errors.emailRecover && touched.emailRecover &&
                                                <HelperText type={'error'}>{errors.emailRecover}</HelperText>}

                                                <Button disabled={!!(errors.emailRecover || values.emailRecover === '')}
                                                        onPress={handleSubmit} buttonColor={Colors.primary}
                                                        title={'Enviar'}
                                                        type={'solid'}
                                                        backgroundStyle={{
                                                            alignSelf: 'center',
                                                            width: '100%',
                                                            marginTop: 20
                                                        }}/>
                                            </>
                                        )
                                    }
                                </Formik>

                            </View>
                        }

                        {
                            msgRecover && !loadingREcoverPass &&
                            <View style={{paddingHorizontal: 40, paddingVertical: 20, justifyContent: 'space-around', flex: 1, }}>
                                <Paragraph children={msgRecover}
                                           style={{fontSize: FontSizes.large, textAlign: 'center'}}/>
                                <Button
                                    onPress={() => {
                                        setShowModalRecoverPass(false)
                                        setMsgRecover(undefined)
                                    }} buttonColor={Colors.primary}
                                    type={"solid"}
                                    title={'Voltar'}
                                    backgroundStyle={{
                                        alignSelf: 'center',
                                        width: '100%',
                                        marginTop: 20
                                    }}/>
                            </View>
                        }

                    </View>
                </Modal>
            </Portal>
        </>
    );
}

export default inject('store')(observer(Login))
