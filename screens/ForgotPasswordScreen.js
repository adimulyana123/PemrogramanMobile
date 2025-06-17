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

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email) {
      Alert.alert('Error', 'Email wajib diisi');
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Berhasil', 'Cek email kamu untuk reset kata sandi');
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/forgotpw.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Kirim Link Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Kembali ke Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#222831',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    color: '#fff',
    borderColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2C74B3',
    padding: 12,
    borderRadius: 30,
    marginTop: 10,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {color: '#ffc107', textAlign: 'center', marginTop: 10},
});
