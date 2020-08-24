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
        this.props.navigation.navigate("Edit Account", { account: this.props.account})
    };

    render(){
        return (
            <View
                style={AccountStyle.container}>
                <View
                    onTouchEnd={this.toggleInfo}
                    style={AccountStyle.header}>
                    <Image
                        style={AccountStyle.img}

                        source={{
                            uri: `https://logo.clearbit.com/${this.props.account.url}`
                        }}/>

                    <View
                        style={AccountStyle.info}>
                        <Text
                            style={AccountStyle.headerText}>{this.props.account.url}</Text>
                        
                        <Text
                            style={AccountStyle.headerUrl}>{this.props.account.email_used}</Text>
                    </View>
                </View>

                {this.state.showInfo ? <AccountInfo account={this.props.account} navigation={this.props.navigation}/> : <View></View>}
            </View>
        )
    }
} 

const AccountStyle = StyleSheet.create({
    container: {
        marginVertical: 25
    },
    header: {
        height: 80,
        flexDirection: "row",
        paddingVertical: 0,
        paddingLeft: 25,
        backgroundColor: "rgb(221,208,235)"
    },
    info: {
        justifyContent: "center"
    },
    img: {
        width: 55,
        height: 55,
        alignSelf: "center",
        borderRadius: 4
    },
    headerText: {
        marginLeft: 15,
        fontSize: 18
    },
    headerUrl: {
        marginLeft: 15,
        fontSize: 12,
        color: "gray"
    }
})