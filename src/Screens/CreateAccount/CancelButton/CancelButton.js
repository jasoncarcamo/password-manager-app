import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

export default class CancelButton extends React.Component{

    toAccounts = ()=>{
        this.props.navigation.navigate("Accounts", { Screen: "All Accounts"});
    };

    render(){
        return (
            <TouchableOpacity
                style={buttonStyle.cancelButton}
                onPress={this.toAccounts}>
                <Text
                    style={buttonStyle.textStyle}>Cancel</Text>
            </TouchableOpacity>
        )
    }
}

const buttonStyle = StyleSheet.create({
    cancelButton: {
        marginRight: 20,
        width: 75,
        height: 40,
        borderWidth: 2,
        borderColor: "rgb(107, 81, 145)",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    cancelText: {
        textAlign: "center",
        color: 'rgb(107, 81, 145)'
    }
});