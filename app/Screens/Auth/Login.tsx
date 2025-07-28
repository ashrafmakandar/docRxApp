import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomeButton from '../../Components/CustomeButton';
import Input from '../../Components/Input';
import LogoImage from '../../Components/LogoImage';


interface User{
    email:string,
    password:string,isActive:boolean,name:string,address:string
}
const Login = () => {

    const [email,setEmail]= useState<string>("");

    const [password,setPassword]= useState<string>("");
    const [user,setUser]= useState<User|null>(null);


    useEffect(()=>{
        AsyncStorage.getItem("user").then((val)=>{
            console.log(val);
            if(val!=null)
            {

                 const checkUser : User = JSON.parse(val);
                 setUser(checkUser);
            }
           

        })

    },[])


    const Login=()=>{

        if(email === "" && email.length<1)
        {
            alert("please enter your email")
        }
        else if(password === "" || password.length<1)
        {
            alert("please enter your password")
        }
        else{
            let loginUser= {
                "email":email,
                "password":password,
                "isActive":true,
                "name":user.name,
                "address":user.address
            }
            console.log(user);

            if(user?.email === email && user.password === password)
            {

            AsyncStorage.setItem("user",JSON.stringify(loginUser))
router.replace("/Screens/(tabs)/Home")
            }
        else{
            router.replace("/Screens/Signup")
        }

        


        }

    }
    
  return (
    <View style={{flex:1,justifyContent:"center"}}>
      
         <LogoImage/>

     
  <Input
  text={email}
  placeHolder='Enter email'
  onChangeText={setEmail}
  />
   <Input
  text={password}
  placeHolder='Enter password'
  onChangeText={setPassword}
  />

  <CustomeButton text={'Login'} color={'#f26522'} onPress={Login}
  enable
  />


    <TouchableOpacity style={{
      marginTop:10,justifyContent:"flex-end",alignContent:"flex-end",alignItems:"center",paddingHorizontal:"4%"
    }}
    onPress={()=>{
      router.replace("/Screens/Auth/Signup")
    }}
    >
      <Text
      style={{
          borderBottomWidth:1,borderBottomColor:"blue"
      }}
      >New user? click here</Text>
    </TouchableOpacity>
    </View>
  )
}

export default Login

