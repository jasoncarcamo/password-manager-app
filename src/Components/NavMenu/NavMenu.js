import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import AppContext from "../../Services/Contexts/AppContext/AppContext";

import Login from "../../Screens/Login/Login";
import AccountsContainer from "../../Screens/AccountsContainer/AccountsContainer";
import CreateAccount from "../../Screens/CreateAccount/CreateAccount";
import SignOut from "../../Screens/SignOut/SignOut";

const Drawer = createDrawerNavigator();

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

    isLoggedIn = ()=> {
        return (
            <>
                <Drawer.Screen
                    name="Accounts"
                    component={AccountsContainer}></Drawer.Screen>
                <Drawer.Screen
                    name="Create Account"
                    component={CreateAccount}></Drawer.Screen>
                <Drawer.Screen
                    name="Sign Out"
                    component={SignOut}></Drawer.Screen>
            </>
        )
    }

    render(){
        return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeBackgroundColor: "purple",
                    inactiveBackgroundColor: "white",
                    activeTintColor: "white",
                    inactiveTintColor: "purple"
                }}
                screenOptions={{
                    unmountOnBlur: true
                }}>
                {this.context.isLoggedIn ? this.isLoggedIn() : this.notLoggedIn()}
            </Drawer.Navigator>
        );
    };
};