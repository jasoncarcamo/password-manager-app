import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View, Dimensions } from 'react-native';
import AppContainer from './src/AppContainer/AppContainer';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class App extends React.Component{

    render(){
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="App"
                        component={<AppContainer/>}
                        options={{
                        }}></Stack.Screen>
                </Stack.Navigator>
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