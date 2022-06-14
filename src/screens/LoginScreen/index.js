import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStateValue } from "../../contexts/StateContext";
import C from './styles'
import api from "../../services/api";

export default () => {

    const navigation = useNavigation()
    const [context, dispatch] = useStateValue()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginButton = async () => {
        if (email && password) {
            let result = await api.login(email, password)
            if (result) {
                dispatch({
                    type: 'setToken',
                    payload: {
                        token: result.jwt
                    }
                });
                dispatch({
                    type: 'setUser',
                    payload: {
                        user: result.user.username
                    }
                });
                navigation.reset({
                    index:1,
                    routes: [{name: 'ChoosePropertyScreen'}]
                });
            } else {
                alert(result.error.message)
            }
        } else {
            alert("Preencha os Campos")
        }
    }

    const handleRegisterButton = () => {
        navigation.navigate('RegisterScreen')
    }

    return (
        <C.Container>
            <C.Logo
                source={require('../../assets/undraw_home.png')}
                resized="contain"
            />
            <C.Field
                placeholder="Digite seu email"
                value={email}
                onChangeText={t => setEmail(t)}
            />
            <C.Field
                placeholder="Digite sua senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t => setPassword(t)}
            />

            <C.ButtonArea onPress={handleLoginButton}> 
                <C.ButtonText>
                    ENTRAR
                </C.ButtonText>
            </C.ButtonArea>

            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>
                    CADASTRAR-SE
                </C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    )
}