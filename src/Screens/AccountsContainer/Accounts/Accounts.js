import React from "react";
import {ScrollView, View, Button, Text} from "react-native";
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
            <ScrollView>
                <Header navigation={this.props.navigation}/>

                {this.context.accountsLoading ? <Text>Loading...</Text> : this.renderAccounts()}

            </ScrollView>
        )
    }
}