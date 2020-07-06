import React from "react";
import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from "react-native";

export default class Header extends React.Component{
    toCreate = ()=>{
        this.props.navigation.navigate("Create Account");
    }
    render(){
        return (
            <View
                style={HeaderStyle.container}>
                <TouchableOpacity
                    style={HeaderStyle.button}
                    onPress={this.toCreate}>
                    <Text
                        style={HeaderStyle.text}>New</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const HeaderStyle = StyleSheet.create({
    container: {
        position: "absolute",
        left: Dimensions.get("screen").width * .7,
        bottom: 0,
        width: 75,
        height: 40,
        borderColor: "lightgrey",
        marginTop: 0,
        marginBottom: 50,
        zIndex: 2
    },
    button: {
        width: 75,
        height: 40,
        borderWidth: 2,
        borderColor: "rgb(107, 81, 145)",
        borderRadius: 4,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        color: "rgb(107, 81, 145)",
        textAlign: "center"
    }
})