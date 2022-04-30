import * as React from "react";
import {
    IconButton,
    Box,
    Input,
    Center,
    ScrollView,
    Icon, HStack,
    Heading,
    FlatList,
    Spacer,
    Avatar,
    VStack,
    Text,
    Flex,
    KeyboardAvoidingView, useToast
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useEffect, useState} from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";

const ChatPrivate = ({route,navigation}) => {
    const [text,setText] =useState('');
    const { token,AvatarUrl,Username,users } = route.params;
    const [msg,setMsg] =useState([]);
    const [room,setRoom] = useState([]);
    let r = 0;
    const toast = useToast();

    const sendText=  ()=>{
        const roomRef = firestore().collection("Chatrooms").doc(room[0].RoomToken);
        if(text!==''){
            roomRef.set({
                LastMessage:"Let's Chat is Now!",
                Member:[...room[0].Member,],
                Message:[...room[0].Message,{
                    recentText:text,
                    reciver:token,
                    sender:users[0].UserToken,
                    timeStamp:moment().format('LT'),
                }],
                RoomToken:room[0].RoomToken,
            })
                .then(() => {
                    console.log("Send Text Successfully");
                });
        }else{
            toast.show({
                title: "Typing Somethings less more 1 aphabet",
                placement: "bottom"
            })
        }
    }

    useEffect(()=>{
        firestore()
            .collection("Chatrooms")
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(token)
                console.log(users[0].UserToken)
                if(data.length!==0){
                    data.map((item)=>{
                        if(item.Member.includes(token)&&item.Member.includes(users[0].UserToken)){
                            if(item.Message.length===0){
                                console.log("No Chat")
                            }else{
                                setMsg([...item.Message])
                                setRoom([...data])
                            }
                        }
                        r++
                    })
                }
            });
    },[])

    return (
        <Box bgColor={'white'} flex={1} >
            <HStack space={0}  mt={1} >
                <IconButton variant={"unstyled"} pl={5} pt={3}
                            icon={<AntDesign name="arrowleft" size={25} color="#2F2E41"/>}
                            onPress={()=>navigation.navigate('Chats')}/>
                <HStack mt={3}>
                    <Avatar ml={5} mr={2} size="30px" source={{
                        uri: AvatarUrl
                    }} />
                    <VStack ml={2} >
                        <Text fontSize={18} _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800">
                            {Username}
                        </Text>
                    </VStack>
                    <Spacer />
                </HStack>
            </HStack>
            <ScrollView  showsVerticalScrollIndicator={false}
                         showsHorizontalScrollIndicator={false} >
                <FlatList data={msg} rounded={30}
                          renderItem={({item}) =>
                              <Box>
                                  { item.sender === users[0].UserToken ? <HStack space={3} justifyContent={'flex-end'}>
                                      <Box mr={1} pr="5" pb="3" pt={1} bg={'muted.200'} w={120} ml={2} mt={3} rounded={30}>
                                          <Text fontSize={16} pl={4} pt={1}
                                                _dark={{color: "warmGray.50"
                                                }} color="coolGray.800">
                                              {item.recentText}
                                          </Text>
                                      </Box>
                                  </HStack> : <HStack space={3} justifyContent={'flex-start'}>
                                      <Box pr="5" pb="3" pt={1} bg={"#634570"} w={120} ml={3} mt={3} rounded={30}>
                                          <Text fontSize={16} pl={5} pt={1} color={'cyan.50'}>
                                              {item.recentText}
                                          </Text>
                                      </Box>
                                  </HStack>  }
                              </Box>
                          }  />
            </ScrollView>
                    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <HStack  pl={5} pt={2} pb={2} bgColor={'white'}>
                                <Input size="xs" variant="rounded" type="text" w={300} h={35}
                                       pl={15} bgColor={'coolGray.100'} borderWidth={0}
                                       placeholder="Typing message.." value={text} onChangeText={setText}/>
                                <IconButton variant={"unstyled"} ml={3} variant={'solid'} rounded={'30'}
                                            bgColor={"#634570"}
                                            icon={<FontAwesome name="send" size={15} color="white"/>}
                                            onPress={()=>{sendText()}}/>
                            </HStack>
                    </KeyboardAvoidingView>
        </Box>
    )
};

export default ChatPrivate;
