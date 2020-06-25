import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

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
        height: 65,
        borderWidth: 2,
        borderColor: "lightgrey",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 100,
        marginBottom: 50,
        backgroundColor: "white"
    },
    button: {
        position: "relative",
        right: 20,
        width: 75,
        height: 40,
        borderWidth: 2,
        borderColor: "purple",
        borderRadius: 4,
        alignSelf: "center",
        justifyContent: "center"
    },
    text: {
        color: "purple",
        textAlign: "center"
    }
})