import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';


interface User{
    name:string,
    email:string,
    address:string,isActive:boolean
}

const Splash = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {




    const timeout = setTimeout(() => {
        AsyncStorage.getItem('user').then((val)=>{
        

            if(val!==null && val!==undefined)
            {
                  const user:User= JSON.parse(val);
    if(user.isActive === true)
    {
        router.replace("/Screens/(tabs)/Home")
    }
    else{
router.replace("/Screens/Auth/Login"); 
    }

            }
            else{
                router.replace("/Screens/Auth/Signup")
            }

  
})
  
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isLogin]);

  return (
    <View style={styles.container}>
   <Image
   source={require("../../assets/images/logo.png")}
   
   />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  }
});
