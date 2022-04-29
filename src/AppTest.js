import {Animated, FlatList, Image, StyleSheet, useWindowDimensions, View} from "react-native";
import React, { useState } from "react";
import {Box, Button, HStack, Text} from "native-base";
import {ExpandingDot} from "react-native-animated-pagination-dots";
import PaginationDot from "react-native-animated-pagination-dot";

const introData = [
    {
        key: '1',
        title: 'Welcome',
        description:
            'Hi , I\'m welendar.',
        image:
            'https://imgz.io/images/2022/04/17/undraw_Mobile_application_re_13u3.png',

    },
    {
        key: '2',
        title: 'About Me',
        description:
            "The most modern calendar in this era.",
        image:
            'https://imgz.io/images/2022/04/17/undraw_Online_calendar_re_wk3t.png',

    },
    {
        key: '3',
        title: 'Let\'s Go!! 🎈',
        description:
            'I will help you remember all your activities!',
        image:
            'https://imgz.io/images/2022/04/17/undraw_Choose_re_7d5a.png',

    }
];

const AppWelcome = ({navigation}) => {
    const { width } = useWindowDimensions();
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const renderItem = React.useCallback(
        ({ item }) => {
            return (
                <Box style={[styles.itemContainer, { width: width - 80 },  ]}>
                    <Text>{item.title}</Text>
                    <Animated.Text>{item.description}</Animated.Text>
                    <Image source={{uri:item.image}} style={{width: 300, height:300
                    }}/>
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
                        activeDotColor={'#676767'}
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
                    <Button w={150} colorScheme='darkBlue'
                            onPress={() => navigation.navigate('Login') }  > Login </Button>
                    <Button w={150}  colorScheme='darkBlue' variant='outline' borderColor='darkBlue.600'color='darkBlue.600'
                            onPress={() => navigation.navigate('Register') }  ml={3}> Create Account </Button></HStack>

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
        alignItems: 'center',

    },
});

export default AppWelcome;
