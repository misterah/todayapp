import * as React from "react";
import {
    IconButton,
    Box,
    Heading,
    VStack,
    FormControl,
    Checkbox,
    Input,
    Button,
    Center,
    HStack,
    ScrollView,
    Text,
    useToast,
} from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';
import {useEffect, useState} from "react";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {Image} from "react-native";

const Register = ({navigation}) => {
    const toast = useToast();
    const [fullname,setFullname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [comfirmpassword,setComfirmPassword] = useState('');

    const handleCheckInput = () => {
        if(fullname&&email&&password&&comfirmpassword!==''){
            if (password.trim()!==''&&comfirmpassword.trim()!==''){
                if(password===comfirmpassword){
                    handleCreateAccount();
                    console.log('Register Successfully');
                    console.log('Username',fullname,);
                    console.log('Email',email);
                    console.log('password',password);
                }
            }
        }else{
            toast.show({
                title: "This Field Is Require",
                placement: "bottom"
            })
        }
    }
    const SavingUsers = () =>{
        const user_id = uuid.v4();
        console.log(user_id);
        const user = firestore().collection("Users").doc(user_id);
            user.set({
                Username: fullname,
                Email: email,
                Password: password,
                Friends: [],
                Chatrooms: [],
                UserToken:user_id,
                AvartarUrl:"https://imgz.io/images/2022/04/26/Group-134.png",
                LastMessage:"Let's Chat is Now!"
            })
            .then(() => {
                console.log("Created Account Successfully");
            });
    }
    const handleCreateAccount = () =>{
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                toast.show({
                    title: "User account created & signed in!",
                    placement: "bottom"
                })
                SavingUsers();
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.show({
                        title: "That email address is already in use!",
                        placement: "bottom"
                    })
                }

                if (error.code === 'auth/invalid-email') {
                    toast.show({
                        title: "That email address is invalid!",
                        placement: "bottom"
                    })
                }
                console.error(error);
            });
    }

    return (
        <ScrollView  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} bgColor={'white'}>
            <Box ml={5} mt={3} alignItems={'flex-start'}>
                <IconButton
                    icon={<Icon name="arrowleft" size={30} color="#2F2E41" />}
                    onPress={()=>navigation.navigate('Login')}/>
                <Image source={{uri:'https://imgz.io/images/2022/04/28/register.png'}} style={{width: 330, height:230}}/>
            </Box>
            <Center w="100%" bgColor={'white'}  mb={1}>
                <Box safeArea p="2" w="90%" maxW="350">
                    <Box mb={4}>
                        <Heading size="xl" mb={1} color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }} fontWeight="black" >
                            Let's Get Started!
                        </Heading>
                        <Heading mt="1" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="medium" size="xs">
                            Create an account to than more feature experience
                        </Heading>
                    </Box>
                    <VStack space={2} >
                        <FormControl  isRequired>
                            <FormControl.Label>FullName</FormControl.Label>
                            <Input variant="filled" placeholder="Firstname Lastname" value={fullname} onChangeText={setFullname}/>
                        </FormControl>
                        <FormControl  isRequired>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input variant="filled" placeholder="name@email.com" value={email} onChangeText={setEmail}/>
                        </FormControl>
                        <FormControl  isRequired>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input variant="filled" type="password" placeholder="Password" value={password} onChangeText={setPassword}/>
                            <FormControl.HelperText>
                                Must be atleast 6 characters.
                            </FormControl.HelperText>
                        </FormControl >
                        <FormControl  isRequired>
                            <FormControl.Label>Comfim Password</FormControl.Label>
                            <Input variant="filled" type="password" placeholder="Comfirm Password" value={comfirmpassword} onChangeText={setComfirmPassword}/>
                            <FormControl.HelperText>
                                Must be same a password.
                            </FormControl.HelperText>
                        </FormControl>

                        <HStack space={6} mt={3}>
                            <Checkbox  bgColor={"#634570"} size="sm" defaultIsChecked >
                                <Text  fontSize="xs">I agree to the Term of Service and Privacy Policy</Text>
                            </Checkbox>
                        </HStack>
                        <Button mt="5" bgColor={"#634570"} shadow={3}  onPress={()=>{
                            handleCheckInput()
                        }}>
                            GetStarted
                        </Button>
                        <HStack pl='12'>
                            <Text mt='3'>
                                Already have an account ?
                            </Text>
                            <Button variant={'unstyled'} _text={{
                                color: "#634570",
                                fontWeight: "medium",
                                fontSize: "sm",
                            }} onPress={()=>navigation.navigate('Register')}>
                                <Text  color={"#634570"} bold >
                                    Sign In
                                </Text>
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </ScrollView>
    )
};

export default Register;
