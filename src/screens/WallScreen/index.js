import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useStateValue } from "../../contexts/StateContext";
import WallItem from "../../components/WallItem";
import C from './styles'
import api from "../../services/api";


export default () => {

    const navigation = useNavigation()
    const [context, dispatch] = useStateValue()

    const [loading, setLoading] = useState(true)
    const [wallList, setWallLits] = useState([])

    useEffect(() => {
        navigation.setOptions({
            headerTiyle: 'Mural de  Avisos'
        })
        getWall()
    }, [])

    const getWall = async () => {
        setLoading(true)
        const result = await api.getWall()
        setLoading(false)
        if (result.error === '') {
            setWallLits(result.list)
        } else {
            alert(result.error)
        }
    }

    return (
        <C.Container>
            {loading && <C.LoadingIcon color="#8863e6" size="large" />}
            {!loading && wallList.length === 0 &&
                <C.NoListArea>
                    <C.NolistText>Não há avisos</C.NolistText>
                </C.NoListArea>
            }

            <C.List 
                data={wallList}
                renderItem= {({item})=> <WallItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </C.Container>
    )
}