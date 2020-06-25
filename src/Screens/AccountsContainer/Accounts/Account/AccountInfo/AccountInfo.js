import React from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity} from "react-native";
import TokenServcie from "../../../../../Services/TokenService/TokenService";
import AppContext from "../../../../../Services/Contexts/AppContext/AppContext";

export default class AccountInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account: {},
            password: "",
            delete: false,
            success: false,
            loading: false,
            error: ""
        };
    };

    static contextType = AppContext;

    componentDidMount(){
        this.setState({
            password: this.hidePassword(this.props.account.password)
        });
    }

    handleDelete = ()=>{

        TokenServcie.getToken()
            .then( token => {
                this.setState({
                    loading: true
                });

                fetch(`https://still-crag-51210.herokuapp.com/api/accounts/${this.props.account.id}`, {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        "authorization": `bearer ${token}`
                    }
                })
                    .then( res => {
                        if(!res.ok){
                            return res.json().then( e => Promise.reject(e));
                        };

                        return res.json();
                    })
                    .then( resData => {
                        
                        this.refreshContext();

                    })
                    .catch( err => {
                        this.setState({ 
                            error: err.error,
                            loading: false 
                        });
                    });
            })
    }

    refreshContext = ()=>{
        this.context.deleteAccount(this.props.account.id)
            .then( data =>{
                this.setState({
                    loading: false,
                    success: true
                })
            })
    }

    renderConfirmDelete = ()=>{
        return (
            <View>
                <Text>You have successfully deleted this account</Text>

                <TouchableOpacity
                    style={InfoStyle.button}
                    onPress={()=>this.props.navigation.navigate("Accounts")}>
                    <Text
                        style={InfoStyle.buttonText}>Ok</Text>
                </TouchableOpacity>
            </View>
        );
    };

    toEditAccount = ()=>{
        this.props.navigation.navigate("Edit Account", {account: this.props.account})
    }

    togglePassword = ()=>{
        let password = this.props.account.password;
        let hiddenPassword = this.state.password;

        if(password === hiddenPassword){
            hiddenPassword = this.hidePassword(hiddenPassword);
        } else{
            hiddenPassword = password;
        };

        this.setState({
            password: hiddenPassword
        });        
    }
    
    hidePassword = (password)=>{
        let hiddenPassword = password.split("");

        hiddenPassword = hiddenPassword.map((password, index)=>{
            password = "*";

            return password;
        });

        return hiddenPassword.join("");
    }

    renderOptions = ()=>{
        return (
            <View>

                <TouchableOpacity
                    style={InfoStyle.button}
                    onPress={this.toEditAccount}>
                    <Text
                        style={InfoStyle.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={InfoStyle.button}
                    onPress={this.showOptions}>
                    <Text
                        style={InfoStyle.buttonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderDeleteOptions = ()=>{
        return (
            <View>
                <Text
                    style={InfoStyle.text}>You are about to delete this account. Are you sure?</Text>

                <TouchableOpacity
                    style={InfoStyle.button}
                    onPress={this.handleDelete}>
                    <Text
                        style={InfoStyle.buttonText}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={InfoStyle.button}
                    onPress={this.showOptions}>
                    <Text
                        style={InfoStyle.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }

    showOptions = ()=>{
        this.setState({
            delete: !this.state.delete
        })
    }

    render(){
        
        return (
            <View
                style={InfoStyle.container}>

                {this.state.success ? this.renderConfirmDelete() : <View></View>}

                <Text
                    style={InfoStyle.text}>Email: {this.props.account.email_used}</Text>
                <Text
                    style={InfoStyle.text}>Username: {this.props.account.user_name}</Text>
                
                <View
                    style={InfoStyle.passwordContainer}>
                    <Text
                        style={InfoStyle.text}>Password: {this.state.password}</Text>

                    <TouchableOpacity
                        style={InfoStyle.button}
                        onPress={this.togglePassword}>
                        <Text
                            style={InfoStyle.buttonText}>Toggle</Text>
                    </TouchableOpacity>
                </View>

                {this.state.loading ? <Text style={InfoStyle.text}>Loading...</Text> : <View></View>}

                {this.state.delete && !this.state.loading ? this.renderDeleteOptions() : <View></View>}

                {!this.state.delete && !this.state.loading ? this.renderOptions() : <View></View>}
            </View>
        )
    }
}

const InfoStyle = StyleSheet.create({
    container: {
        backgroundColor: "#F0F9FF",
        paddingBottom: 20
    },
    text: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 16
    },
    passwordContainer:{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10
    },
    button: {
        width: 75,
        height: 40,
        backgroundColor: "purple",
        borderRadius: 4,
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 5
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 17
    }
})