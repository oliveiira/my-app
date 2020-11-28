import React, {useContext, useState} from 'react';
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
import PersonIcon from '../../../assets/person.svg';
import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [firstNameField, setFirstNameField] = useState('');
    const [lastNameField, setLastNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if(firstNameField !== '' && lastNameField !== '' && emailField !== '' && passwordField !== '') {
            let res = await Api.signUp(firstNameField, lastNameField, emailField, passwordField);

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
                alert('Não deu certo!');
            }
        } else {
            alert('Preencha todos os campos!')
        }
    }

    const handleSignMsgButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160"/>

            <InputArea>
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={firstNameField}
                    onChangeText={text => setFirstNameField(text)}
                />
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu sobrenome"
                    value={lastNameField}
                    onChangeText={text => setLastNameField(text)}
                />
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
                    <ButtonText>CADASTRAR</ButtonText>
                </Button>
            </InputArea>

            <SignMsgButton onPress={handleSignMsgButtonClick}>
                <SignMsgButtonText>Já possui uma conta?</SignMsgButtonText>
                <SignMsgButtonTextBold>Faça login</SignMsgButtonTextBold>
            </SignMsgButton>
        </Container>
    );
}
