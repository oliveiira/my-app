import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
          <Text>SignIn</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
       backgroundColor: '#fff'
   }
});
