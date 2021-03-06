import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import CancelButton from "../CreateAccount/CancelButton/CancelButton";
import MenuIcon from "../../Components/MenuIcon/MenuIcon";
import Accounts from "./Accounts/Accounts";
import EditAccount from "../EditAccount/EditAccount";

const Stack = createStackNavigator()

export default class AccountsContainer extends React.Component{
    render(){
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="All Accounts"
                    component={Accounts}
                    options={{
                        headerLeft: () => <MenuIcon navigation={this.props.navigation}/>,
                        headerTitle: "All",
                        headerTitleAlign: "center",
                    }}></Stack.Screen>

            <Stack.Screen
                name="Edit Account"
                component={EditAccount}
                options={{
                    headerTitleAlign: "center",
                    headerRight: ()=> <CancelButton navigation={this.props.navigation}/>
                }}></Stack.Screen>
                
            </Stack.Navigator>
        )
    }
}