import React from 'react';
import {Button, Text, View, Image, StyleSheet} from "react-native";
import AccountInfo from "./AccountInfo/AccountInfo";

export default class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showInfo: false
        }
    };

    toggleInfo = ()=>{
        this.setState({
            showInfo: !this.state.showInfo
        });
    };

    render(){

        return (
            <View
                style={AccountStyle.container}>
                <View
                    onTouchEnd={this.toggleInfo}
                    style={AccountStyle.header}>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100
                        }}

                        source={{
                            uri: `https://logo.clearbit.com/${this.props.account.url}`
                        }}/>

                    <Text
                        style={AccountStyle.headerText}>{this.props.account.email_used}</Text>
                </View>

                {this.state.showInfo ? <AccountInfo account={this.props.account} navigation={this.props.navigation}/> : <View></View>}
            </View>
        )
    }
} 

const AccountStyle = StyleSheet.create({
    container: {
        marginBottom: 50
    },
    header: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingLeft: 25,
        borderWidth: 1,
        backgroundColor: "white"
    },
    headerText: {
        marginLeft: 15,
        textAlign: "center",
        alignSelf: "center",
        fontSize: 18
    }
})