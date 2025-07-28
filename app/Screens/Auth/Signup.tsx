import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomeButton from '../../Components/CustomeButton';
import Input from '../../Components/Input';
import LogoImage from '../../Components/LogoImage';


const Signup = () => {
const [email,setEmail]= useState<string>();
const [password,setPassword]= useState<string>();
const [name,setName]= useState<string>();
const [address,setAddress]= useState<string>();
const router = useRouter();


const validate=()=>{
    console.log("clicked")

    if(email?.length<1)
    {
        alert("emial cant be empty")
    }
    else if(password?.length<1)
    {
        alert("password cant be empty")
    }
    else if(name?.length<1)
    {
        alert("name cant be empty")
    }
    else {
        if(name && password && email && address)
        {
            alert("registered");
            let user= {
                "name":name,"email":email,"password":password,
                "address":address,
                "isActive":true
            }
        AsyncStorage.setItem("user",JSON.stringify(user));

        router.replace({
  pathname: "/Screens/Home",
  params: {
    user: JSON.stringify(user), // must be a string
  },
});
        
            setEmail("");
            setPassword("")
            setName("")
            setAddress("");
            
        }
        else{
            alert("please fill all fields")
        }
        
    }

}

  return (
    <View style={{flex:1,justifyContent:"center"}}>
          <LogoImage/>
  <Input
text={email}
onChangeText={setEmail}
placeHolder='Enter email'

  />
    <Input
text={password}
onChangeText={setPassword}
placeHolder='Enter password'
securetextEntry={true}

  />
    <Input
text={name}
onChangeText={setName}
placeHolder='Enter name'

  />

   <Input
text={address}
onChangeText={setAddress}
placeHolder='Enter address'
numberofLines={5}

  />

  <CustomeButton
  text='Register'
  onPress={validate}
  color='#f26522'
  enable
  
  />

  <TouchableOpacity style={{
    marginTop:10,justifyContent:"flex-end",alignContent:"flex-end",alignItems:"center",paddingHorizontal:"4%"
  }}
  onPress={()=>{
    router.replace("/Screens/Auth/Login")
  }}
  >
    <Text
    style={{
        borderBottomWidth:1,borderBottomColor:"blue"
    }}
    >Have an Account? click here</Text>
  </TouchableOpacity>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({})