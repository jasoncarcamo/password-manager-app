import React from "react";
import {View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import TokenService from "../../Services/TokenService/TokenService";
import AppContext from "../../Services/Contexts/AppContext/AppContext";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            emailError: "",
            passwordError: "",
            loading: false
        };
    };

    static contextType = AppContext;

    handleLogin = ()=>{

        this.setState({
            error: "",
            emailError: "",
            passwordError: "",
            loading: true
        });

        if(!this.state.email){
            this.setState({
                emailError: "Missing email",
                loading: false
            });

            return;
        };

        if(!this.state.password){
            this.setState({
                passwordError: "Missing password",
                loading: false
            });

            return;
        };

        fetch("https://still-crag-51210.herokuapp.com/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then( res => {
                if( !res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                TokenService.saveToken(resData.token)
                    .then( tokenSaved => {
                        this.context.loginUser()
                            .then( loggedin => {
                                return this.setState({
                                    loading: false
                                });
                            })
                    });
            })
            .catch( err => this.setState({ 
                email: "",
                password: "",
                loading: false,
                error: err.error
            }));
    }

    handleEmail = (text)=>{
        this.setState({
            email: text
        });
    };

    handlePassword = (text)=>{
        this.setState({
            password: text
        });
    };

    render(){
        return (
            <ScrollView
                style={LoginStyle.container}>

                <Text
                    style={LoginStyle.headerText}>Log in to your account</Text>
                
                <TextInput
                    style={LoginStyle.textInput}
                    onChangeText={this.handleEmail}
                    value={this.state.email}
                    placeholder="Email"></TextInput>
                {this.state.emailError ? <Text style={LoginStyle.inputError}>{ this.state.emailError}</Text> : <View></View>}

                <TextInput
                    style={LoginStyle.textInput}
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder="Password"></TextInput>
                {this.state.passwordError ? <Text style={LoginStyle.inputError}>{this.state.passwordError}</Text> : <View></View>}

                {this.state.error ? <Text style={LoginStyle.error}>{this.state.error}</Text> : <View></View>}

                {this.state.loading ? <Text style={LoginStyle.loading}>Loading...</Text> : <TouchableOpacity
                    style={LoginStyle.button}
                    onPress={this.handleLogin}>
                        <Text style={LoginStyle.buttonText}>Log In</Text>    
                </TouchableOpacity>}

            </ScrollView>
        )
    }
}

const LoginStyle = StyleSheet.create({
    container: {
        height: Dimensions.get("screen").height,
        backgroundColor: "white",
        paddingBottom: 95
    },
    headerText: {
        fontSize: 20,
        marginTop: Dimensions.get("screen").height / 5,
        marginBottom: 55,
        textAlign: "center"
    },
    textInput: {
        marginVertical: 7,
        width: 250,
        height: 40,
        fontSize: 16,
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: "center",
        paddingLeft: 10 
    },
    inputError: {
        width: 250,
        color: "red",
        alignSelf: "center",
        marginTop: -7,
        marginBottom: 7
    },
    error: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 15,
        color: "red"
    },
    loading: {
        fontSize: 16,
        textAlign: "center"
    },
    button: {
        width: 75,
        height: 40,
        backgroundColor: "purple",
        borderRadius: 4,
        justifyContent: "center",
        alignSelf: "center"
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 17
    }
})