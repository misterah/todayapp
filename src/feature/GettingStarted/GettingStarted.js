import {Animated, FlatList, Image, StyleSheet, useWindowDimensions, View} from "react-native";
import React, { useState } from "react";
import {Box, Button, HStack, Heading, Text, Center} from "native-base";
import {ExpandingDot} from "react-native-animated-pagination-dots";


const introData = [
    {
        key: '1',
        title: 'The simplest way to share a moment!',
        description:
            'Welcome to TODAY, make your life easier\n than yesterday. Share your moments, feelings,\nexperiences with chat conversations simply.',
        image:
            'https://imgz.io/images/2022/04/28/first.png',

    },
    {
        key: '2',
        title: 'Share your moment with friends',
        description:
            'Communicate with others fast and easily.\n Chat with your friends by private or group chat. \n Keep them all in your chats',
        image:
            'https://imgz.io/images/2022/04/28/second.png',

    },
    {
        key: '3',
        title: 'Keep your chats safety',
        description:
            'Other than ease, TODAY will gives you great\nsecurity. Keep your conversation safe with us.\n Start to join the app, your friends are waiting!',
        image:
            'https://imgz.io/images/2022/04/28/three6ff93d8c63eb263c.png',

    }
];


const AppWelcome = ({navigation}) => {
    const { width } = useWindowDimensions();
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const renderItem = React.useCallback(
        ({ item }) => {
            return (
                <Box style={[styles.itemContainer, { width: width - 80 },  ]} >
                    <Center>
                        <Image source={{uri:item.image}} style={{width: 330, height:330
                        }}/>
                        <Heading textAlign={'center'}  size={'lg'} color={'#3F3D56'}>{item.title}</Heading>
                        <Text textAlign={'center'}  mt={2}> {item.description}</Text>
                    </Center>
                </Box>
            );
        },
        [width]
    );
    const keyExtractor = React.useCallback((item) => item.key, []);
    return (
        <Box style={[styles.container]}>
            <FlatList
                data={introData}
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                    }
                )}
                style={styles.flatList}
                pagingEnabled
                horizontal
                decelerationRate={'normal'}
                scrollEventThrottle={16}
                renderItem={renderItem}
            />
            <Box style={styles.text}>
                <Box style={styles.dotContainer}>
                    <ExpandingDot
                        data={introData}
                        expandingDotWidth={30}
                        scrollX={scrollX}
                        inActiveDotColor={'#C4C4C4'}
                        activeDotColor={'#634570'}
                        inActiveDotOpacity={0.5}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 3,

                        }}
                    />
                </Box>
            </Box>
            <Box style={styles.buttonContainer} pt={5}>
                <HStack>
                    <Button w={150} bgColor={'#634570'}
                            onPress={() => navigation.navigate('Login') }  > Login </Button>
                </HStack>
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFFFFF',

    },
    text: {
        flex: 1,
        justifyContent: 'flex-end',

    },

    dotContainer: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    itemContainer: {
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 40,
        marginVertical:0,
    },
    buttonContainer:{
        flex: 1,
        marginLeft:50,
        marginRight:50,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',

    },
});

export default AppWelcome;
