import LoginForm from '@/components/login/loginView';
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/fondoLogin.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            <LoginForm/>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
}); 