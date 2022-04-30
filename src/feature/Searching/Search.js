import * as React from "react";
import {
    IconButton,
    Box,
    Input,
    Center,
    ScrollView,
    Icon, HStack,
    FlatList,
    Spacer,
    Avatar,
    VStack,
    Text,
    AlertDialog, useToast,
} from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from "react-native-vector-icons/Feather";
import {useEffect, useState} from "react";
import firestore from '@react-native-firebase/firestore';
import uuid from "react-native-uuid";

const Search = ({route,navigation}) => {
    const [text,setText] =useState('');
    const [userArr,setUserArr] =useState();
    const [isAdd,setIsAdd] =useState(false);
    const UserRef = firestore().collection("Users");
    const { UserData } = route.params;
    const toast = useToast();
    const FreindsList = []
    const FetchData =()=>{
        let user = []
        UserRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),}));
                data.map((item)=>{
                    user.push(item)
                })
                setUserArr(user);
            });
    }

    const AddFriends = async (userid)=> {

        const user = await firestore().collection('Users').doc(userid).get();
        firestore()
            .collection('Users')
            .doc(UserData[0].UserToken)
            .get()
            .then(documentSnapshot => {
                const Freinds = documentSnapshot.data().Friends
                console.log('User exists: ', documentSnapshot.exists);
                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    if (documentSnapshot.data().Friends.length === 0) {
                        console.log('1.Friends data: ', documentSnapshot.data().Friends);
                        updatarequest();
                        updataresponse();
                        CreateRooms(UserData[0].UserToken,userid);
                    } else {
                        Freinds.map((item) => {
                            FreindsList.push(item)
                        })
                        console.log('2.Friends data: ', documentSnapshot.data().Friends);
                        UserData[0].Friends.map((item) => {
                            if (user._data.UserToken !== item) {
                                firestore().collection('Users').doc(UserData[0].UserToken).update({
                                    Friends: [...FreindsList, user._data.UserToken],
                                })
                                    .then(() => {
                                        console.log('User Update Successfully!');
                                        toast.show({
                                            title: 'User Update Successfully!',
                                            placement: "bottom"
                                        })
                                        CreateRooms(UserData[0].UserToken,userid)
                                    });
                                firestore().collection('Users').doc(userid).update({
                                    Friends: [...FreindsList, UserData[0].UserToken],
                                })
                            } else {
                                console.log('You Have A Friends');
                            }
                        })
                    }
                }
            });
        const updatarequest = () => {
            firestore().collection('Users').doc(UserData[0].UserToken).update({
                Friends: [userid],
            })
                .then(() => {
                    console.log('User Update Successfully!',userid);

                });
        }
        const updataresponse = () => {
            firestore().collection('Users').doc(userid).update({
                Friends: [UserData[0].UserToken],
            })
                .then(() => {
                    console.log('User Update Successfully!',UserData[0].UserToken);

                });
        }
    }

    const CreateRooms = (user1,user2) =>{
        const roomtoken = uuid.v4();
        const roomsRef = firestore().collection("Chatrooms");
        roomsRef.get().then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                data.map((item)=>{
                    if(item.RoomToken!==roomtoken){
                        firestore()
                            .collection('Chatrooms')
                            .doc(roomtoken)
                            .set({
                                Member: [user1,user2],
                                Message: [],
                                RoomToken:roomtoken,
                                LastMessage:"Let's To Chat Now !",
                            })
                        firestore().collection('Users').doc(UserData[0].UserToken).update({
                            Chatrooms: [roomtoken],
                        })
                            .then(() => {
                                console.log('User Update Successfully!',roomtoken);

                            });
                        firestore().collection('Users').doc(userid).update({
                            Chatrooms: [roomtoken],
                        })
                            .then(() => {
                                console.log('User Update Successfully!',roomtoken);

                            });
                    }else{
                        console.log("Room was created")
                    }
                })
                console.log("All data in 'books' collection", data);

            });
    }
    useEffect(()=>{
        if(userArr===undefined){
            FetchData()
        }
        console.log(userArr)
    },[FetchData])
    return (
        <ScrollView  showsVerticalScrollIndicator={false}
                     showsHorizontalScrollIndicator={false} bgColor={'white'}>
            <Center w="100%" bgColor={'white'} mt={25} >
                <Box safeArea w="100%" maxW="380">
                    <HStack alignItems={'space-around'}>
                        <IconButton variant={"unstyled"}
                            icon={<MaterialIcons name="keyboard-arrow-left" size={30} color="#2F2E41"/>}
                            onPress={()=>navigation.navigate('Chats')}/>

                        <Input variant="filled" type="text" w={320} rounded={30}
                               placeholder="Searching.."
                               InputLeftElement={<Icon as={<Ionicons name="ios-search" />}
                                                       size={5} ml="4" color="muted.400" />}
                               placeholder="Search" value={text} onChangeText={setText}/>
                    </HStack>
                    <Box>
                        <Text fontSize="xs" p="4" pb="3" mt={0} mb={2} ml="110" color={"coolGray.500"}>
                              Searching Result..
                        </Text>
                        <FlatList data={userArr} rounded={30}
                                  renderItem={({item}) => (item.Username === text)&&(item.Email.toLowerCase()!==UserData[0].Email.toLowerCase()) ? <Box  pl="4" pr="5" py="2">
                                      <HStack space={3} justifyContent="space-between" mt={1}>
                                          <Avatar size="52px" source={{uri: item.AvatarUrl}} />
                                          <VStack ml={2}>
                                              <Text fontSize={18} _dark={{
                                                  color: "warmGray.50"
                                              }} color="coolGray.800">
                                                  {item.Username}
                                              </Text>
                                          </VStack>
                                          <Spacer />
                                          <IconButton variant={"unstyled"} onPress={()=>{AddFriends(item.UserToken)}}
                                                      icon={<AntDesign name="user-plus" size={22} color="#475569" /> } pt={1}/>
                                      </HStack>
                                  </Box>:null} />
                    </Box>
                </Box>
            </Center>
        </ScrollView>
    )
};

export default Search;
