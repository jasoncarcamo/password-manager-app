import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import AppContext from "../../Services/Contexts/AppContext/AppContext";

import CancelButton from "../../Screens/CreateAccount/CancelButton/CancelButton";

import Login from "../../Screens/Login/Login";
import AccountsContainer from "../../Screens/AccountsContainer/AccountsContainer";
import CreateAccount from "../../Screens/CreateAccount/CreateAccount";
import SignOut from "../../Screens/SignOut/SignOut";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class NavMenu extends React.Component{

    static contextType = AppContext;

    notLoggedIn = () => {
        return (
            <>
                <Drawer.Screen
                    name="Log In"
                    component={Login}></Drawer.Screen>
            </>
        )
    }

    createAccount = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Create account"
                    component={CreateAccount}
                    options={{
                        headerRight: () => <CancelButton navigation={navigation}/>
                    }}></Stack.Screen>
            </Stack.Navigator>
        )
    }

    isLoggedIn = ()=> {
        return (
            <>
                <Drawer.Screen
                    name="Accounts"
                    component={AccountsContainer}></Drawer.Screen>
                <Drawer.Screen
                    name="Create Account"
                    component={this.createAccount}></Drawer.Screen>
                <Drawer.Screen
                    name="Sign Out"
                    component={SignOut}></Drawer.Screen>
            </>
        )
    }

    render(){
        console.log(this.props)
        return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeBackgroundColor: "rgb(107, 81, 145)",
                    inactiveBackgroundColor: "white",
                    activeTintColor: "white",
                    inactiveTintColor: "rgb(107, 81, 145)"
                }}>
                {this.context.isLoggedIn ? this.isLoggedIn() : this.notLoggedIn()}
            </Drawer.Navigator>
        );
    };
};