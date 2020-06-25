import React from "react";
import TokenService from "../../TokenService/TokenService";

const AppContext = React.createContext({
    user: {},
    isLoggedIn: false,
    accounts: [],
    loginUser: ()=>{},
    accountsLoading: false,
    refreshAccounts: ()=>{},
    deleteAccount: ()=>{},
    signoutAdmin: ()=>{}
});

export default AppContext;

export class AppProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoggedIn: false,
            accounts: [],
            accountsLoading: false 
        }
    }

    componentDidMount(){
        TokenService.getToken()
            .then( token => {
                if(token){

                    this.setState({
                        isLoggedIn: true,
                        accountsLoading: true
                    });

                    Promise.all([fetch("https://still-crag-51210.herokuapp.com/api/user", {
                        headers: {
                            "content-type": "application/json",
                            "authorization": `bearer ${token}`
                        }
                    }), fetch(`https://still-crag-51210.herokuapp.com/api/accounts`, {
                        headers: {
                            "content-type": "application/json",
                            "authorization": `bearer ${token}`
                        }
                    })])
                        .then( ([userRes, accountsRes]) => {
                            
                            if( !userRes.ok){
                                return userRes.json().then ( e => Promise.reject(e))
                            };

                            if(!accountsRes.ok){
                                return accountsRes.json().then( e => Promise.reject(e));
                            };

                            return Promise.all([userRes.json(), accountsRes.json()])
                        })
                        .then( ([userData, accountsData]) => {
                            
                            this.setState({
                                user: userData.user,
                                accounts: accountsData.accounts,
                                accountsLoading: false
                            });

                        })
                        .catch( err => this.setState({ 
                            error: err.error,
                            accountsLoading: false
                        })); 
                    }
            })
    }

    loginUser = async ()=>{
        TokenService.getToken()
            .then( token => {
                if(token){

                    this.setState({
                        isLoggedIn: true,
                        accountsLoading: true
                    });

                    Promise.all([fetch("https://still-crag-51210.herokuapp.com/api/user", {
                        headers: {
                            "content-type": "application/json",
                            "authorization": `bearer ${token}`
                        }
                    }), fetch(`https://still-crag-51210.herokuapp.com/api/accounts`, {
                        headers: {
                            "content-type": "application/json",
                            "authorization": `bearer ${token}`
                        }
                    })])
                        .then( ([userRes, accountsRes]) => {
                            
                            if( !userRes.ok){
                                return userRes.json().then ( e => Promise.reject(e))
                            };

                            if(!accountsRes.ok){
                                return accountsRes.json().then( e => Promise.reject(e));
                            };

                            return Promise.all([userRes.json(), accountsRes.json()])
                        })
                        .then( ([userData, accountsData]) => {
                            
                            this.setState({
                                user: userData.user,
                                accounts: accountsData.accounts,
                                accountsLoading: false
                            });

                            return;
                        })
                        .catch( err => {
                            this.setState({ 
                                error: err.error,
                                accountsLoading: false
                            });

                            return;
                        }); 
                    }
            })
    }

    addAccounts = async (account)=>{
        this.componentDidMount();

        const accounts = this.state.accounts.concat([account]);     
        

        return await accounts
    }

    refreshAccounts = async (account, id)=>{
        let accounts = this.state.accounts;
        let index = accounts.findIndex( account => account.id == id);

        this.componentDidMount();

        accounts.splice( index, 1, account);
        
        return await accounts;
    }

    deleteAccount= async (id)=>{
        this.componentDidMount();

        let accounts = this.state.accounts;
        let index = accounts.findIndex( account => account.id == id);

        accounts.splice( index, 1);
        
        return await accounts;
    }

    signoutAdmin = async ()=>{
        
        return await this.setState({
            isLoggedIn: false,
            bookings: [],
            contacts: []
        });
    }

    render(){
        const value= {
            user: this.state.user,
            isLoggedIn: this.state.isLoggedIn,
            accounts: this.state.accounts,
            accountsLoading: this.state.accountsLoading,
            loginUser: this.loginUser,
            addAccounts: this.addAccounts,
            refreshAccounts: this.refreshAccounts,
            deleteAccount: this.deleteAccount,
            signoutAdmin: this.signoutAdmin
        };
        
        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}