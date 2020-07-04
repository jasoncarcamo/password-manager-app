import React from "react";
import {View, Button, Text, TouchableOpacity} from "react-native";

export default class MenuIcon extends React.Component{

    render(){

        return (
            <TouchableOpacity
                onPress={()=> this.props.navigation.openDrawer()}
                style={{
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    width: 25,
                    height: 20,
                    marginHorizontal: 30
            }}>

                    <Text
                        style={{
                            width: 23,
                            height: 4,
                            backgroundColor: "purple",
                        }}
                        ></Text>

                    <Text
                        style={{
                            width: 23,
                            height: 4,
                            marginVertical: 4,
                            backgroundColor: "purple",
                        }}
                        ></Text>
                    
                    <Text
                        style={{
                            width: 23,
                            height: 4,
                            marginTop: 0,
                            backgroundColor: "purple",
                        }}
                        ></Text>
            </TouchableOpacity>
        );
    };
};