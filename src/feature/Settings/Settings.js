import React from "react";
import {
    Avatar,
    Box, Button,
    Center,
    Checkbox, FlatList,
    FormControl,
    Heading,
    HStack,
    IconButton,
    Input,
    Pressable,
    ScrollView, Spacer,
    Text,
    VStack,
    AlertDialog, useToast
} from "native-base";
import {Image, Linking} from "react-native";
import Ionicons from "react-native-vector-icons/Feather";
import Matriallcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import {useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";

const Settings = ({route,navigation}) => {
    const { email } = route.params;
    const UserData = [];
    const [user,setUser] =useState()
    const [load,setLoad] =useState(false);
    const toast = useToast();

    function handleLogout(){
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    const forgotPassword = () => {
        auth().sendPasswordResetEmail(email)
            .then(function (user) {
                console.log('Please check your email...')
            }).catch(function (e) {
            console.log(e)
        })
        toast.show({
            title: "Please check your inbox",
            placement: "bottom"
        })
    }
    useEffect(()=>{
        async function fetchData (){
            await firestore()
                .collection("Users")
                .onSnapshot((snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    data.map((item)=>{
                        if(item.Email.toLowerCase()===email.toLowerCase()){
                            UserData.push(item)
                            console.log("Data Information Users", UserData);
                        }
                    })
                    setUser(UserData);
                });
            console.log("After then",user)
            setLoad(true);
            console.log(load);
        }
        fetchData();
        console.log(load);
    },[]);
    return(
        <Box flex={1} padding={5} bgColor={'white'} >
            <HStack space={3} justifyContent="space-between">
                <Heading size={'lg'} color={'#3F3D56'} bold>
                    Settings
                </Heading>
            </HStack>
                <Box safeArea p="2" w="90%" maxW="350">
                    <VStack space={3} >
                        <FlatList  data={user} renderItem={({item}) =>
                            <Box borderBottomWidth="0" _dark={{}} borderColor='#3F3D56' pl="0" pr="5"  mt="2">
                                <HStack space={3} justifyContent="space-between">
                                    <Avatar size="52px" source={{uri: item.AvatarUrl}} />
                                    <VStack>
                                        <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>{item.Username}</Text>
                                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>{item.Email}</Text>
                                    </VStack>
                                    <Spacer />
                                    {/*<Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">{"13.00 PM"}</Text>*/}
                                </HStack>
                            </Box>
                        } keyExtractor={item => item.id} />
                        {/*<FormControl>
                            <FormControl.Label>PROFILE</FormControl.Label>
                            <Pressable onPress={() => console.log("I'm Pressed")} rounded="8"
                                       overflow="hidden"  mt={1} padding={'3'}
                                       maxW="96"   p="5">
                            <HStack space={3} justifyContent={'space-between'}>
                                <HStack >
                                    <Ionicons name="user" size={20} color="#475569" />
                                    <Heading ml={5} size={'sm'} color={'#475569'}>Your Profile</Heading>
                                </HStack>
                                <Matriallcons name="keyboard-arrow-right" size={20} color="#475569"  />
                            </HStack>
                            </Pressable>
                        </FormControl>*/}
                        <FormControl>
                            <FormControl.Label>SECURITY</FormControl.Label>
                            <Pressable onPress={() => forgotPassword()} rounded="8"
                                       overflow="hidden"  mt={1} padding={'3'}
                                       maxW="96"   p="5">
                                <HStack space={3} justifyContent={'space-between'}>
                                    <HStack >
                                        <Matriallcons name="security" size={20} color='#3F3D56' />
                                        <Heading ml={5} size={'sm'} color={'#3F3D56'}> Forgot Password</Heading>
                                    </HStack>
                                    <Matriallcons name="keyboard-arrow-right" size={20} color='#3F3D56'  />
                                </HStack>
                            </Pressable>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>HELP</FormControl.Label>
                            <Pressable onPress={() => console.log("I'm Pressed")} rounded="8"
                                       overflow="hidden"  mt={1} padding={'3'}
                                       maxW="96"   p="5">
                                <HStack space={3} justifyContent={'space-between'}>
                                    <HStack >
                                        <AntDesign name="questioncircleo" size={20} color='#3F3D56' />
                                        <Heading ml={5} size={'sm'} color={'#3F3D56'}> FAQ </Heading>
                                    </HStack>
                                    <Matriallcons name="keyboard-arrow-right" size={20} color='#3F3D56'  />
                                </HStack>
                            </Pressable>
                            <Pressable onPress={() => Linking.openURL('mailto:support@example.com') } rounded="8"
                                       overflow="hidden"  mt={1} padding={'3'}
                                       maxW="96"   p="5">
                                <HStack space={3} justifyContent={'space-between'}>
                                    <HStack >
                                        <Matriallcons name="attach-email" size={20} color='#3F3D56' />
                                        <Heading ml={5} size={'sm'} color={'#3F3D56'}> Contact support </Heading>
                                    </HStack>
                                    <Matriallcons name="keyboard-arrow-right" size={20} color='#3F3D56'  />
                                </HStack>
                            </Pressable>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>LOGOUT</FormControl.Label>
                            <Pressable onPress={() => handleLogout()} rounded="8"
                                       overflow="hidden"  mt={1} padding={'3'}
                                       maxW="96"   p="5">
                                <HStack space={3} justifyContent={'space-between'}>
                                    <HStack >
                                        <Matriallcons name="logout" size={20} color="#dc2626" />
                                        <Heading ml={5} size={'sm'} color={'#dc2626'}> Logut </Heading>
                                    </HStack>
                                </HStack>
                            </Pressable>
                        </FormControl>
                    </VStack>
                </Box>
        </Box>
    );
};

export default Settings;
