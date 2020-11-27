import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    InputArea,
    Button,
    ButtonText,
    SignMsgButton,
    SignMsgButtonText,
    SignMsgButtonTextBold
} from './styles';

import SignInput from "../../components/SignInput";

import BarberLogo from '../../../assets/barber.svg';
import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';

export default () => {
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = () => {

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
