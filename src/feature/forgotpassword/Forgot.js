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
    KeyboardAvoidingView
} from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';
import {Image} from "react-native";
import auth from "@react-native-firebase/auth";
import {useState} from "react";

const Forgot = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [isSend,setIsSend] = useState(false);
    const toast = useToast();

    const forgotPassword = () => {
        if(email!==''){
            auth().sendPasswordResetEmail(email)
                .then(function (user) {
                    console.log('Please check your email...')
                }).catch(function (e) {
                console.log(e)
            })
            setIsSend(true);
        }else{
            toast.show({
                title: "Please Entry Email",
                placement: "bottom"
            })
        }
    }

    return (
            <Box px={3} bgColor={'white'} height={'100%'}>
                <Box ml={5} mt={5} alignItems={'flex-start'}>
                    <IconButton
                        icon={<Icon name="arrowleft" size={30} color="#2F2E41" />}
                        onPress={()=>navigation.navigate('Login')}/>
                </Box>
                {!isSend? <Box alignItems={'center'} mt={5} >
                    <Heading mb={3}> Forgot your password ?</Heading>
                    <Text mb={10} textAlign={'center'}>Enter your registed email below  to receive password {'\n'}reset instruction</Text>
                    <Image  source={{uri:'https://imgz.io/images/2022/04/28/register.png'}} style={{width: 330, height:230}}/>
                    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Input mx={3} mt={5} w={350} variant="filled" placeholder="named@email.com" value={email} onChangeText={setEmail} />
                    </KeyboardAvoidingView>
                    <HStack alignItems={'center'} mt='2'>
                        <Text>
                            Remember password ?
                        </Text>
                        <Button  variant={'unstyled'} _text={{
                            color: "#634570",
                            fontWeight: "medium",
                            fontSize: "sm",
                        }} onPress={()=>navigation.navigate('Login')}>
                            <Text  color={"#634570"} bold >
                                Login
                            </Text>
                        </Button>
                    </HStack>
                    <Button mt={3} bgColor={"#634570"} shadow={1} w={350}  h={50} onPress={()=>{forgotPassword()}}>
                        Send
                    </Button>

                </Box>: <Box alignItems={'center'} mt={5} >
                    <Heading mb={3}> Email has been sent! ? </Heading>
                    <Text mb={5} textAlign={'center'}>
                        Please check your inbox and click in the received {'\n'} link  to reset a password </Text>
                    <Heading fontSize={'lg'}>{email}</Heading>
                    <Image  source={{uri:'https://imgz.io/images/2022/04/28/register.png'}} style={{width: 330, height:230}}/>
                    <HStack alignItems={'center'} mt='2'>
                    </HStack>
                    <Button mt={3} bgColor={"#634570"} shadow={1} w={350}  h={50} onPress={()=>{navigation.navigate('Login')}}>
                        Login
                    </Button>
                    <HStack alignItems={'center'} mt='2'>
                        <Text>
                            Did'nt receive the link ?
                        </Text>
                        <Button  variant={'unstyled'} _text={{
                            color: "#634570",
                            fontWeight: "medium",
                            fontSize: "sm",
                        }} onPress={()=>forgotPassword()}>
                            <Text  color={"#634570"} bold >
                                resend
                            </Text>
                        </Button>
                    </HStack>
                </Box>}
            </Box>
    )
};

export default Forgot;
