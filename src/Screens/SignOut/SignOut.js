import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import AppContext from "../../Services/Contexts/AppContext/AppContext";
import TokenService from "../../Services/TokenService/TokenService";

export default class SignOut extends React.Component{

    static contextType = AppContext;

    handleSignOut = ()=>{
        TokenService.deleteToken()
            .then( tokenDeleted => {
                this.context.signoutAdmin()
                    .then( signedOut => {
                        return;
                    });
            });
    };

    render(){
        return (
            <View
                style={SignOutStyle.container}>
                    <TouchableOpacity
                        style={SignOutStyle.button}
                        onPress={this.handleSignOut}>
                        <Text
                            style={SignOutStyle.text}>Sign Out</Text>
                    </TouchableOpacity>
            </View>
        );
    };
};

const SignOutStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: "50%",
        left: "50%",
        transform: [
            {translateX: -87.5},
            {translateY: -50}
        ],
        width: 175,
        height: 45,
        padding: 0,
        backgroundColor: "rgb(107, 81, 145)"
    },
    text: {
        margin: 0,
        fontSize: 16,
        textAlign: "center",
        color: "white"
    }
})