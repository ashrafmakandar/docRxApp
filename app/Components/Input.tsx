import React from 'react';
import { TextInput } from 'react-native';

interface InputProps{
   text:string,
    placeHolder:string,
    onChangeText: (text: string) => void;
    securetextEntry?:boolean,
    numberofLines?:number

    
    

}

const Input = ({text,placeHolder,onChangeText,securetextEntry,numberofLines}:InputProps) => {
  return (
   <TextInput
   value={text}
   placeholder={placeHolder}
   onChangeText={onChangeText}
   secureTextEntry={securetextEntry}
   numberOfLines={numberofLines}
   style={{
       borderWidth: 1,
    borderColor: '#ccc',
   backgroundColor:"#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation:5,
    color:"#000",
    
    fontSize:17,padding:10,margin:5,
    height:numberofLines>3?100:50
   }}

   />
  )
}

export default Input