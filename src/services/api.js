import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// http://localhost:1337/api/users rota para cadastro de usuarios necessitando de nome email e senha

let headers = { 'Content-Type': 'application/json' }
axios.defaults.headers = headers

export default {

    getToken: async () => {
        return await AsyncStorage.getItem('token')
    },
    validateToken: async () => {
        let token = await AsyncStorage.getItem('token')
        let json = await request('post', '/auth/validate', {}, token)
        return json
    },
    login: async (email, password) => {
        body = JSON.stringify({ identifier:email, password:password })
        let  { data} = await axios.post('http://192.168.1.7:1337/api/auth/local',body)
        return data
    },
    logout: async () => {
        let token = await AsyncStorage.getItem('token')
        let json = await request('post', '/auth/logout', {}, token)
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('property')
        return json
    },
    register: async (name, email, cpf, password, password_confirm) => {
        let json = await request('post', '/auth/register', {
            name, email, cpf, password, password_confirm
        })
        return json
    },
    getWall: async () => {
        let token = await AsyncStorage.getItem('token')
        let json = await request('get', '/walls', {}, token)
        return json
    }
}

