import React  from "react";
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, Button} from "react-native";
import TokenService from "../../Services/TokenService/TokenService";
import AppContext from "../../Services/Contexts/AppContext/AppContext";

export default class EditAccount extends React.Component{
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
            editing: false,
            error: ""
        }
    }

    static contextType = AppContext;

    componentDidMount(){
        this.setState({
            url: this.props.route.params.account.url,
            email_used: this.props.route.params.account.email_used,
            user_name: this.props.route.params.account.user_name,
            password: this.props.route.params.account.password
        });
    }

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
    };

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
            editing: true,
            urlError: "",
            emailError: "",
            passwordError: ""
        })

        if(!this.state.url){
            this.setState({
                urlError: "Missing url",
                editing: false
            });

            return;
        };

        if(!this.state.email_used){
            this.setState({
                emailError: "Missing email",
                editing: false
            });

            return;
        };

        if(!this.state.password){
            this.setState({
                passwordError: "Missing password",
                editing: false
            });

            return;
        };

        this.reWriteUrl(this.state.url)
            .then( newUrl => {

                TokenService.getToken()
                    .then( token => {

                        fetch(`https://still-crag-51210.herokuapp.com/api/accounts/${this.props.route.params.account.id}`, {
                            method: "PATCH",
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
                                this.refreshAccounts(resData.account);
                            })
                            .catch( err => {
                                this.setState({ 
                                    error: err.error,
                                    editing: false
                                })
                            });
                    })
            })        
        
    };

    refreshAccounts = (account)=>{
        this.context.refreshAccounts( account, account.id)
            .then( data=> {
                
                this.setState({
                    success: true,
                    url: "",
                    email_used: "",
                    user_name: "",
                    password: "",
                    editing: false
                });

            });
    };
    
    renderConfirmBox = ()=>{
        return (
            <View
                style={EditStyle.successContainer}>

                <Text
                    style={EditStyle.successText}>You have successfully edited this account</Text>

                <TouchableOpacity
                    style={EditStyle.button}
                    onPress={this.toAccounts}>
                        <Text style={EditStyle.buttonText}>Ok</Text>    
                </TouchableOpacity>
            </View>
        )
    }

    toAccounts = ()=>{
        this.props.navigation.goBack();
    }

    render(){
        return (
            <ScrollView>

                {this.state.success ? this.renderConfirmBox() : <Text></Text>}

                <TouchableOpacity
                    style={EditStyle.cancelButton}
                    onPress={this.toAccounts}>
                    <Text
                        style={EditStyle.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <View
                    style={EditStyle.container}>
                    <TextInput
                        style={EditStyle.textInput}
                        placeholder="Main url"
                        onChangeText={this.handleUrl}
                        value={this.state.url}></TextInput>
                    {this.state.urlError ? <Text style={EditStyle.inputError}>{this.state.urlError}</Text> : <Text></Text>}

                    <TextInput
                        placeholder="Email"
                        style={EditStyle.textInput}
                        onChangeText={this.handleEmail}
                        value={this.state.email_used}></TextInput>
                    {this.state.emailError ? <Text style={EditStyle.inputError}>{this.state.emailError}</Text> : <View></View>}
                    
                    <TextInput
                        placeholder="Username if applicable"
                        style={EditStyle.textInput}
                        onChangeText={this.handleUserName}
                        value={this.state.user_name}></TextInput>
                    {this.state.usernameError ? <Text style={EditStyle.inputError}>{this.state.usernameError}</Text> : <View></View>}

                    <TextInput
                        secureTextEntry={true}
                        style={EditStyle.textInput}
                        placeholder="Password"
                        onChangeText={this.handlePassword}
                        value={this.state.password}></TextInput>
                    {this.state.passwordError ? <Text style={EditStyle.inputError}>{this.state.passwordError}</Text> : <View></View>}

                    {this.state.editing ? <Text style={EditStyle.loading}>Loading...</Text> : <TouchableOpacity
                    style={EditStyle.button}
                    onPress={this.handleSubmit}>
                        <Text style={EditStyle.buttonText}>Save</Text>    
                    </TouchableOpacity>}
                </View>
            </ScrollView>
        );
    };
};

const EditStyle = StyleSheet.create({
    container: {
        marginVertical: 85
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
        marginBottom: 7,
        alignSelf: "center"
    },
    cancelButton: {
        marginRight: 20,
        marginTop: 10,
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
    loading: {
        fontSize: 16,
        textAlign: "center"
    },
    successContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "white",
        zIndex: 2
    },
    successText: {
        textAlign: "center",
        paddingHorizontal: 20,
        fontSize: 16,
        marginTop: window.innerHeight / 2.5,
        marginBottom: 10
    },
    button: {
        width: 75,
        height: 40,
        backgroundColor: "rgb(107, 81, 145)",
        borderRadius: 4,
        justifyContent: "center",
        alignSelf: "center"
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 17
    }
});