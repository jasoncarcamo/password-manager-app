import React from "react";
import {} from "react-native";

import {AppProvider} from "../Services/Contexts/AppContext/AppContext";
import NavMenu from "../Components/NavMenu/NavMenu";

export default class AppContainer extends React.Component{
    render(){
        console.log(this.props)
        return (
            <AppProvider>
                <NavMenu navigation={this.props.navigation}/>
            </AppProvider>
        );
    };
};