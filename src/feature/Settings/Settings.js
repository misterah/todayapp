import React from "react";
import {
    Box, Button,
    Center,
    Checkbox,
    FormControl,
    Heading,
    HStack,
    IconButton,
    Input,
    Pressable,
    ScrollView,
    Text,
    VStack
} from "native-base";
import {Linking} from "react-native";
import Ionicons from "react-native-vector-icons/Feather";
import Matriallcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
const Settings = () => {
    function handleLogout(){
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    return(
        <Box flex={1} padding={5} bgColor={'white'} >
            <HStack space={3} justifyContent="space-between">
                <Heading size={'lg'} color={'#475569'} bold>
                    Settings
                </Heading>
            </HStack>
                <Box safeArea p="2" w="90%" maxW="350" py="5">
                    <VStack space={2} mt="5">
                        <FormControl>
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
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>SECURITY</FormControl.Label>
                            <Pressable onPress={() => console.log("I'm Pressed")} rounded="8"
                                       overflow="hidden"  mt={1} padding={'3'}
                                       maxW="96"   p="5">
                                <HStack space={3} justifyContent={'space-between'}>
                                    <HStack >
                                        <Matriallcons name="security" size={20} color="#475569" />
                                        <Heading ml={5} size={'sm'} color={'#475569'}> Change Password</Heading>
                                    </HStack>
                                    <Matriallcons name="keyboard-arrow-right" size={20} color="#475569"  />
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
                                        <AntDesign name="questioncircleo" size={20} color="#475569" />
                                        <Heading ml={5} size={'sm'} color={'#475569'}> FAQ </Heading>
                                    </HStack>
                                    <Matriallcons name="keyboard-arrow-right" size={20} color="#475569"  />
                                </HStack>
                            </Pressable>
                            <Pressable onPress={() => Linking.openURL('mailto:support@example.com') } rounded="8"
                                       overflow="hidden"  mt={1} padding={'3'}
                                       maxW="96"   p="5">
                                <HStack space={3} justifyContent={'space-between'}>
                                    <HStack >
                                        <Matriallcons name="attach-email" size={20} color="#475569" />
                                        <Heading ml={5} size={'sm'} color={'#475569'}> Contact support </Heading>
                                    </HStack>
                                    <Matriallcons name="keyboard-arrow-right" size={20} color="#475569"  />
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
