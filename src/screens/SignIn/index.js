import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserContext } from "../../contexts/UserContext";
import {
    Container,
    InputArea,
    Button,
    ButtonText,
    SignMsgButton,
    SignMsgButtonText,
    SignMsgButtonTextBold
} from './styles';

import Api from '../../Api';

import SignInput from "../../components/SignInput";

import BarberLogo from '../../../assets/barber.svg';
import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';

export default () => {
    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if(emailField !== '' && passwordField !== '') {
            let res = await Api.signIn(emailField, passwordField);

            console.log(res);

            if(res.token) {
                await AsyncStorage.setItem('token', res.token);

                userDispatch({
                   type: 'setAvatar',
                   payload: {
                       avatar: res.avatar
                   }
                });

                navigation.reset({
                   routes: [{
                       name: 'Home'
                   }]
                });
            } else {
                alert('E-mail e/ou senha incorretos!');
            }
        } else {
            alert('Preencha todos os campos!')
        }
    }

    const handleSignMsgButtonClick = () => {
        navigation.reset({
           routes: [{name: 'SignUp'}]
        });
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160"/>

            <InputArea>
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={text => setEmailField(text)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={text => setPasswordField(text)}
                    password={true}
                />

                <Button onPress={handleSignClick}>
                    <ButtonText>LOGIN</ButtonText>
                </Button>
            </InputArea>

            <SignMsgButton onPress={handleSignMsgButtonClick}>
                <SignMsgButtonText>Ainda não possui uma conta?</SignMsgButtonText>
                <SignMsgButtonTextBold>Cadastre-se</SignMsgButtonTextBold>
            </SignMsgButton>
        </Container>
    );
}
