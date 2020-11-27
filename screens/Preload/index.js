import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import BarberLogo from '../../assets/barber.svg';

export default () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('@token');

                if(token !== null) {
                    // validar token
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
