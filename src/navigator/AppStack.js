import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Box} from "native-base";

import Ionicons  from 'react-native-vector-icons/Ionicons';

import gettingStarted from "../feature/GettingStarted/GettingStarted";
import Login from "../feature/Login/Login";
import Register from "../feature/Login/Register";
import Chats from '../feature/Chats/Chats';
import Setting from '../feature/Settings/Settings';
import LogInAuth from "../feature/Auth/Auth";
import Search from "../feature/Searching/Search";
import ChatPrivate from "../feature/Chats/CharPrivate";
import Forgot from "../feature/forgotpassword/Forgot";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack  = ({route,navigation}) => {
    const { itemId } = route.params;
    console.log(itemId)
    return (
        <Box bgColor={'white'} h={'100%'}>
            <Tab.Navigator initialRouteName={'Chats'}
                screenOptions={({ route }) => ({
                    tabBarStyle:{paddingVertical: 5,borderTopLeftRadius:35,
                        borderTopRightRadius:35,backgroundColor:'white',height:80},
                    tabBarLabelStyle:{paddingBottom:15},
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Chats') {
                            return (
                                <Ionicons
                                    name={focused? 'chatbox' : 'ios-chatbox-outline'}
                                    size={size}
                                    color={color}
                                />
                            );
                        } else if (route.name === 'Settings') {
                            return (
                                <Ionicons
                                    name={focused? 'settings-sharp':'settings-outline'}
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                    },
                    tabBarInactiveTintColor: '#BBBBBB',
                    tabBarActiveTintColor: "#634570",
                })}>
                <Tab.Screen
                    name="Chats"
                    component={Chats}
                    initialParams={{ email: itemId }}
                    //options={{ tabBarBadge: 3 }}
                />

                <Tab.Screen name="Settings" component={Setting} initialParams={{ email: itemId }}/>
            </Tab.Navigator>
        </Box>
    );
}


function AppStack() {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}
                             initialRouteName={'Auth'}>
                <Stack.Screen name="Search" component={Search}/>
                <Stack.Screen name="Chatprivate" component={ChatPrivate}/>
                <Stack.Screen name="Home" component={HomeStack}/>
                <Stack.Screen name="Auth" component={LogInAuth}/>
                <Stack.Screen name="Welcome" component={gettingStarted}/>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Forgot" component={Forgot} />
            </Stack.Navigator>
    );
}

export default AppStack;
