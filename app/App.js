import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✅ Zync работает!</Text>
      <Text style={styles.subtext}>Телефон: открой браузер по ссылке</Text>
      <Text style={styles.subtext}>ХУЙ БЛЯТЬ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 10,
  },
});
