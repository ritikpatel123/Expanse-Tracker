//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../../constants/styles';


const LoadingOverlay = () => {
    return (
        <View style={styles.container}>
        <ActivityIndicator size={'large'} color="white"/>
        </View> 

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700,
       
    },
});

//make this component available to the app
export default LoadingOverlay;
