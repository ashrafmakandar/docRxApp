import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CircularProfileProps {
  text: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

const CircularProfile = ({
  text,
  size = 80,
  backgroundColor = '#007AFF',
  textColor = '#fff',
}: CircularProfileProps) => {
  
  const getInitials = (fullText: string): string => {
    const words = fullText?.trim()?.split(' ');
   
    const initials =
      words.length === 1
        ? words[0][0]
        : words[0][0] + words[1][0];
    return initials.toUpperCase();
  };

  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text style={[styles.initials, { color: textColor, fontSize: size / 2 }]}>
        {getInitials(text)}
      </Text>
    </View>
  );
};

export default CircularProfile;

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: 'bold',
  },
});
