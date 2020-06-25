import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import MenuIcon from "../../Components/MenuIcon/MenuIcon";
import Accounts from "./Accounts/Accounts";
import EditAccount from "../EditAccount/EditAccount";

const Stack = createStackNavigator()

export default class AccountsContainer extends React.Component{
    render(){
        return (
            <Stack.Navigator
                screenOptions={{
                    headerRight: () => <MenuIcon navigation={this.props.navigation}/> 
                }}>
                <Stack.Screen
                    name="All Accounts"
                    component={Accounts}></Stack.Screen>

            <Stack.Screen
                name="Edit Account"
                component={EditAccount}></Stack.Screen>
                
            </Stack.Navigator>
        )
    }
}