import React, {useEffect, useState} from "react";
import {
    Box,
    Heading,
    ScrollView,
    FlatList,
    HStack,
    Avatar,
    VStack,
    Text,
    Spacer,
    IconButton,
    Pressable,
    useToast
} from "native-base";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import AntDesign  from 'react-native-vector-icons/FontAwesome';
import firestore from "@react-native-firebase/firestore";
import {Use} from "react-native-svg";
const Chats = ({ route, navigation }) => {
    const { email } = route.params;
    const UserData = [];
    const [user,setUser] =useState()
    const FriendsList = [];
    const [freinds,setFreinds] = useState();
    const [load,setLoad] =useState(false);
    const toast = useToast();
    function handleLoadingData(item,Avatar,username){
        navigation.navigate('Chatprivate',{token:item,AvatarUrl:Avatar,Username:username,users:user});
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
                    if(data.length!==0&&UserData.length!==0){
                        data.map((item)=>{
                            if(UserData[0].Friends.includes(item.UserToken)){
                                FriendsList.push(item);
                                console.log("this is ",item)
                            }else{
                                console.log(false)
                            }
                        })
                    }
                    setFreinds(FriendsList);
                    console.log("This is Friends List",FriendsList);
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
                    <Heading size={'lg'} color={'#3F3D56'} Bold>
                        Message
                    </Heading>
                    <IconButton bgColor={'#F4F4F4'} rounded={30} onPress={()=>{
                        navigation.navigate('Search',{UserData:user})
                    }} variant={"unstyled"} icon={
                        <AntDesign name="search" size={20} color="#475569" />}/>
                </HStack>
                <ScrollView  showsVerticalScrollIndicator={false}
                             showsHorizontalScrollIndicator={false}>
                    <Box>
                        <FlatList  data={freinds} renderItem={({item}) =>
                            <Pressable onPress={()=>handleLoadingData(item.UserToken,item.AvatarUrl,item.Username)} rounded="8" maxW="96" p="1">
                                <Box borderBottomWidth="0" _dark={{}} borderColor="#475569" pl="0" pr="5" py="2" mt="2">
                                    <HStack space={3} justifyContent="space-between">
                                        <Avatar size="52px" source={{uri: item.AvatarUrl}} />

                                        <VStack>
                                            <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>{item.Username}</Text>
                                            <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>{item.LastMessage}</Text>
                                        </VStack>
                                        <Spacer />
                                        <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">{"13.00 PM"}</Text>
                                    </HStack>
                                </Box>
                            </Pressable>} keyExtractor={item => item.id} />
                    </Box>
                </ScrollView>
            </Box>
    );
};

export default Chats;
