import React, { useEffect, useState } from "react";
import { Box, Center, NativeBaseProvider, Image, Text} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import {Provider, useDispatch, useSelector} from "react-redux";
import theme from "./theme/index";
import {store} from "./redux/store";

const App = () => {

    return(
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <Text>Hello</Text>
            </NativeBaseProvider>
        </NavigationContainer>
    )
};

export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

