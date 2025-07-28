import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function LogoImage() {
  return (
         <Image
             source={require("../../assets/images/logo.png")}
         resizeMode="center"
             style={styles.img
          
             }
             
             />
  )
}
const styles = StyleSheet.create({
    img:{
            height:110,
            width:110,
          borderRadius:25,borderWidth:1,
          borderColor:"green",
            justifyContent:"center",
            backgroundColor:"#fff",
            alignContent:"center",alignItems:"center",alignSelf:"center",margin:10,
              elevation: 5,

  // Shadows for iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
    }
})