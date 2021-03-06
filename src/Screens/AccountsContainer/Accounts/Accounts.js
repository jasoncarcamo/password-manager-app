import React from "react";
import {ScrollView, View, Button, Text, StyleSheet, Dimensions} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import AppContext from "../../../Services/Contexts/AppContext/AppContext";

import Header from "./Header/Header";
import Account from "./Account/Account";

const Stack = createStackNavigator();

export default class Accounts extends React.Component{

    static contextType = AppContext;

    renderAccounts = ()=>{
        let accounts = this.context.accounts;

        if(accounts.length === 0){
            return <Text>You have not saved any accounts yet</Text>
        };

        accounts = accounts.map((account, index)=> {
            return <Account key={index} account={account} navigation={this.props.navigation}/>
        });
        
        return accounts;
    };

    render(){
        return (
            <View
                style={AccountContainer.container}>
                <ScrollView
                    style={AccountContainer.container}>
                    
                    {this.context.accountsLoading ? <Text style={AccountContainer.loading}>Loading...</Text> : this.renderAccounts()}

                    
                </ScrollView>

                {this.context.accountsLoading ? <View></View> : <Header navigation={this.props.navigation}/>}
            
            </View>
        )
    }
};

const AccountContainer = StyleSheet.create({
    container: {
        marginBottom: 0,
        backgroundColor: "rgb(107, 81, 145)",
    },
    view: {
        borderWidth: 1
    },
    loading: {
        paddingTop: 20,
        fontSize: 16,
        backgroundColor: "white",
        height: Dimensions.get("screen").height
    }
})