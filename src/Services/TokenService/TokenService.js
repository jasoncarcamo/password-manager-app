import {AsyncStorage} from "react-native";

const TokenService = {
    async getToken(){
        return await AsyncStorage.getItem("password-admin");
    },
    async hasToken(){
        return this.getToken();
    },
    async saveToken(token){
        return await AsyncStorage.setItem("password-admin", token);
    },
    async deleteToken(){
        return AsyncStorage.removeItem("password-admin");
    }
};

export default TokenService;