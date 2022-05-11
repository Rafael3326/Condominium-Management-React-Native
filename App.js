import React from "react";
import { View, Text } from "react-native";
import { StateProvider } from "./src/contexts/StateContext";


export default () => {

  return (
    <StateProvider>
      <View>
        <Text>Bem vindo ao DevCondd</Text>
      </View>
    </StateProvider>
  )
}