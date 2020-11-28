import React, {useEffect, useContext} from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Api from "../../Api";
import { UserContext } from "../../contexts/UserContext";

import BarberLogo from '../../../assets/barber.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                if(token !== null) {
                    let res = await Api.checkToken(token);

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
                        navigation.navigate('SignIn');
                    }
                } else {
                    navigation.navigate('SignIn');
                }
            } catch (e) {
                console.log(e);
            }
        }

        checkToken();
    }, []);

    return (
        <View style={styles.container}>
            <BarberLogo width="100%" height="160"/>
            <ActivityIndicator size="large" color="#fff" style={styles.loading}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#63C2D1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        marginTop: 50
    }
});
