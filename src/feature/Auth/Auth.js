import React, {useEffect, useState} from "react";
import auth from "@react-native-firebase/auth";


function LogInAuth({navigation}) {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        if (!user) {
            navigation.navigate('Welcome')
        }else{
            navigation.navigate('Home',{itemId:user.email})
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount

    }, []);

    if (initializing) return null;

    return null;
}

export default LogInAuth;
