import React from "react";
import {ScrollView, View, Text, Button, TextInput, StyleSheet, Dimensions} from "react-native";
import AppContext from "../../Services/Contexts/AppContext/AppContext";
import TokenService from "../../Services/TokenService/TokenService";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class CreateAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: "",
            urlError: "",
            email_used: "",
            emailError: "",
            user_name: "",
            usernameError: "",
            password: "",
            passwordError: "",
            success: false,
            creating: false,
            error: ""
        }
    };
    static contextType = AppContext;

    handleUrl = (text)=>{
        
        this.setState({ url: text });
    }

    reWriteUrl = async (url) =>{
        let newUrl = url;

        if(newUrl.includes("://")){
            newUrl = newUrl.substring(newUrl.indexOf("://") + 3);

            this.setState({
                url: newUrl
            });
        };

        if(newUrl.includes("www.")){
            newUrl = newUrl.substring(newUrl.indexOf("www.") + 4);

            this.setState({
                url: newUrl
            });
        };

        return await newUrl;
    }

    handleEmail = (text)=>{
        this.setState({ email_used: text });
    }

    handleUserName = (text)=>{
        this.setState({ user_name: text });
    }

    handlePassword = (text)=>{

        this.setState({ password: text });
    }

    handleSubmit = ()=>{

        this.setState({
            creating: true,
            urlError: "",
            emailError: "",
            passwordError: ""
        })

        if(!this.state.url){
            this.setState({
                urlError: "Missing url",
                creating: false
            });

            return;
        };

        if(!this.state.email_used){
            this.setState({
                emailError: "Missing email",
                creating: false
            });

            return;
        };

        if(!this.state.password){
            this.setState({
                passwordError: "Missing password",
                creating: false
            });

            return;
        };

        this.reWriteUrl(this.state.url)
            .then( newUrl => {

                TokenService.getToken()
                    .then( token => {

                        fetch(`https://still-crag-51210.herokuapp.com/api/accounts`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                "authorization": `bearer ${token}`
                            },
                            body: JSON.stringify({
                                url: this.state.url,
                                email_used: this.state.email_used,
                                user_name: this.state.user_name,
                                password: this.state.password
                            })
                        })
                            .then( res => {
                                if(!res.ok){
                                    return res.json().then( e => Promise.reject(e));
                                };

                                return res.json();
                            })
                            .then( resData => {

                                this.addAccounts(resData.account);

                            })
                            .catch( err => this.setState({ 
                                error: err.error,
                                creating: false
                        }));
                    })
            })        
        
    };

    addAccounts = (account)=>{
        this.context.addAccounts(account)
            .then( data => {

                this.setState({ 
                    success: true,
                    url: "",
                    email_used: "",
                    user_name: "",
                    password: "",
                    creating: false
                })
                
            });
    };
    
    renderConfirmBox = ()=>{
        return (
            <View
                style={CreateStyle.successContainer}>

                <Text
                    style={CreateStyle.successText}>You have successfully added a new account to your list</Text>

                <TouchableOpacity
                    style={CreateStyle.button}
                    onPress={this.toAccounts}>
                        <Text style={CreateStyle.buttonText}>Ok</Text>    
                </TouchableOpacity>
            </View>
        )
    }

    toAccounts = ()=>{
        this.props.navigation.navigate("Accounts", { Screen: "All Accounts"});
    }

    render(){
        return(
            <ScrollView
                style={CreateStyle.scrollContainer}>

                {this.state.success ? this.renderConfirmBox() : <Text></Text>}
                
                <View
                    style={CreateStyle.container}>
                    <TextInput
                        style={CreateStyle.textInput}
                        placeholder="Main url"
                        onChangeText={this.handleUrl}
                        value={this.state.url}></TextInput>
                    {this.state.urlError ? <Text style={CreateStyle.inputError}>{this.state.urlError}</Text> : <Text></Text>}

                    <TextInput
                        placeholder="Email"
                        style={CreateStyle.textInput}
                        onChangeText={this.handleEmail}
                        value={this.state.email_used}></TextInput>
                    {this.state.emailError ? <Text style={CreateStyle.inputError}>{this.state.emailError}</Text> : <View></View>}
                    
                    <TextInput
                        placeholder="Username ( If applicable)"
                        style={CreateStyle.textInput}
                        onChangeText={this.handleUserName}
                        value={this.state.user_name}></TextInput>
                    {this.state.usernameError ? <Text style={CreateStyle.inputError}>{this.state.usernameError}</Text> : <View></View>}

                    <TextInput
                        secureTextEntry={true}
                        style={CreateStyle.textInput}
                        placeholder="Password"
                        onChangeText={this.handlePassword}
                        value={this.state.password}></TextInput>
                    {this.state.passwordError ? <Text style={CreateStyle.inputError}>{this.state.passwordError}</Text> : <View></View>}

                    {this.state.creating ? <Text>Loading...</Text> : <TouchableOpacity
                    style={CreateStyle.button}
                    onPress={this.handleSubmit}>
                        <Text style={CreateStyle.buttonText}>Save</Text>    
                </TouchableOpacity>}
                </View>
            </ScrollView>
        )
    }
}

const CreateStyle = StyleSheet.create({
    scrollContainer: {
        backgroundColor: "rgb(107, 81, 145)"
    },
    container: {
        paddingTop: 25
    },
    textInput: {
        marginTop: 15,
        width: 250,
        height: 40,
        fontSize: 16,
        color: "white",
        borderColor: "lightgrey",
        borderBottomWidth: 1,
        borderRadius: 4,
        alignSelf: "center",
        paddingLeft: 10
    },
    inputError: {
        width: 250,
        color: "red",
        marginBottom: 7,
        alignSelf: "center"
    },
    cancelButton: {
        marginRight: 20,
        marginTop: 85,
        width: 75,
        height: 40,
        borderWidth: 2,
        borderColor: "rgb(107, 81, 145)",
        borderRadius: 4,
        alignSelf: "flex-end",
        justifyContent: "center"
    },
    cancelText: {
        textAlign: "center",
        color: 'rgb(107, 81, 145)'
    },
    successContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width,
        backgroundColor: "white",
        zIndex: 2
    },
    successText: {
        textAlign: "center",
        paddingHorizontal: 20,
        fontSize: 16,
        marginTop: Dimensions.get("screen").height / 2.5,
        marginBottom: 10,
        backgroundColor: "white"
    },
    button: {
        width: 75,
        height: 40,
        backgroundColor: "white",
        borderRadius: 4,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 15
    },
    buttonText: {
        color: "rgb(107, 81, 145)",
        textAlign: "center",
        fontSize: 17
    }
})