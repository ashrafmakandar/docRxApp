import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


interface ButtonProps{
    text:string,
    enable?:boolean,
    color:string,
    onPress:() => void
}

const CustomeButton = ({text,enable,color,onPress}:ButtonProps) => {
  return (
   <TouchableOpacity
   style={[styles.btn, { backgroundColor: color, opacity: enable ? 1 : 0.6 }]}
   
   onPress={onPress}>

    <Text style={styles.text}>{text}</Text>

   </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
btn:{
    height:48,
    padding:5,margin:5,borderWidth:1,borderRadius:12,
    justifyContent:"center",alignContent:"center"

},text:{
    fontSize:17,textAlign:"center",fontWeight:"bold",color:"#fff"
}


})

export default CustomeButton