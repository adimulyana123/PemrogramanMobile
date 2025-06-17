import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({navigation}) => {
  const user = auth().currentUser;

  const [photo, setPhoto] = useState(user?.photoURL || null);
  const [bio, setBio] = useState('');
  const name = user?.displayName || '';
  const email = user?.email || '';

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const {uri} = selectedImage;

      setPhoto(uri); // Menampilkan preview foto lokal
      Alert.alert('Berhasil', 'Foto profil berhasil diperbarui (sementara).');
    }
  };

  const handleSave = async () => {
    try {
      await firestore().collection('users').doc(user.uid).set(
        {
          bio: bio,
        },
        {merge: true},
      );

      Alert.alert('Tersimpan', 'Perubahan profil berhasil disimpan');
    } catch (error) {
      console.error('Gagal menyimpan bio:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan bio');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#222831" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Profil Pengguna</Text>

        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={photo ? {uri: photo} : require('../assets/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.changePhoto}>Ganti Foto</Text>
        </TouchableOpacity>

        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.emailText}>{email}</Text>

        <TextInput
          value={bio}
          onChangeText={setBio}
          style={[styles.input, {height: 100}]}
          placeholder="Bio singkat..."
          placeholderTextColor="#aaa"
          multiline
        />

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222831',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    backgroundColor: '#FB9E3A',
    padding: 10,
    borderRadius: 8,
    marginBottom: 40,
    width: 100,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changePhoto: {
    color: '#00ADB5',
    textAlign: 'center',
    marginBottom: 20,
  },
  nameText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emailText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#393E46',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#00ADB5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
