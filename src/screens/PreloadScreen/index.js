import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from './styles'
import api from "../../services/api";
import { useStateValue } from "../../contexts/StateContext";

 export default () => {

    const navigation = useNavigation()
    const [context,dispatch] = useStateValue()

    useEffect(() => {

        const checkLogin = async () => {
            let token = await api.getToken()
            if(token) {
                // let result = await api.validateToken()
                    // dispatch({
                    //     type: 'setUser',
                    //     payload: {
                    //         user: result.user.username
                    //     }
                    // })
                    navigation.reset({
                        index:1,
                        routes:[{name: 'ChoosePropertyScreen'}]
                    })

            } else {
                navigation.reset({
                    index:1,
                    routes:[{name: 'LoginScreen'}]
                })
            }
        }

        checkLogin()
    }, [])

     return (
         <C.Container>
             <C.LoadingIcon color="#8863E6" size="large" />      
         </C.Container>
     )
 }