import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View, Dimensions } from 'react-native';
import AppContainer from './src/AppContainer/AppContainer';
import {NavigationContainer} from "@react-navigation/native";

export default class App extends React.Component{

    render(){
        return (
            <NavigationContainer>
                <AppContainer/>
            </NavigationContainer>
        )
    }
};

const DemoStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    text: {
        position: "relative",
        top: "50%",
        fontSize: 20,
        textAlign: "center"
    }
})