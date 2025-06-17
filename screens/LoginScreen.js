// LoginScreen.js

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        let message = 'Terjadi kesalahan saat login';
        if (error.code === 'auth/invalid-email') {
          message = 'Format email tidak valid';
        } else if (error.code === 'auth/user-not-found') {
          message = 'Akun tidak ditemukan';
        } else if (error.code === 'auth/wrong-password') {
          message = 'Password salah';
        }
        Alert.alert('Login Gagal', message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Masuk ke Akun Anda</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Lupa kata sandi?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#222831',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#393E46',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#393E46',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#00ADB5',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 12,
  },
  link: {
    color: '#FB9E3A',
    textAlign: 'center',
    fontSize: 14,
  },
});
