import CircularProfile from '@/app/Components/CircularProfile'
import CustomeButton from '@/app/Components/CustomeButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'


interface User{
    name:string,
    email:string,
    address:string,isActive:boolean
}

const Profile = () => {
      const [user, setUser] = useState<User | null>(null);

 useEffect(() => {
    const loadUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value) {
          const parsedUser: User = JSON.parse(value);
          console.log('Loaded user:', parsedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    loadUser();
  }, []);


const updateUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);

      // Modify a property
      user.isActive = false;

      // Save back
      await AsyncStorage.setItem('user', JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};


  return (
    <View style={{flex:1,justifyContent:"center",alignContent:"center",alignItems:"center"}}>
        <CircularProfile
        text={user?.name|| 'User'}
        backgroundColor='#000'
        size={170}
        />
        <View style={{
            padding:10,margin:10
        }}>
                <Text style={styles.text}>{user?.name}</Text>
      <Text style={[styles.text,{
        fontSize:17,fontWeight:"600"
      }]}>{user?.email}</Text>
        <Text style={[styles.text,{
            fontWeight:"300",fontSize:15
        }]}>{user?.address}</Text>
        <CustomeButton
        text='LOGOUT'
        onPress={()=>{
           updateUser();
            router.replace("/")
        }}
        color='#000'
        enable
        />
        </View>
  
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
text:{
    fontSize:27,fontWeight:"800",color:"#000",textAlign:"center",marginTop:10,marginBottom:5,padding:5
}

})