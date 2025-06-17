// DashboardScreen.js

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const Dashboard = ({navigation}) => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user && user.displayName) {
      const displayName = user.displayName.split(' ')[0];
      setFirstName(displayName);
    }
  }, []);

  const handleLogout = () => {
    auth().signOut(); // biarkan navigasi dihandle dari App.js saat onAuthStateChanged
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#222831" />
      <Text style={styles.welcomeText}>Halo, {firstName || 'Pengguna'} 👋</Text>

      <View style={styles.container}>
        <Image
          source={require('../assets/dashboard.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Dashboard</Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Calendar')}>
            <Icon name="calendar" size={40} color="#fff" />
            <Text style={styles.cardText}>Kalender</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Profile')}>
            <Icon name="account-circle" size={40} color="#fff" />
            <Text style={styles.cardText}>Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Tasks')}>
            <Icon name="format-list-bulleted" size={40} color="#fff" />
            <Text style={styles.cardText}>List Tugas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.logout]}
            onPress={handleLogout}>
            <Icon name="logout" size={40} color="#fff" />
            <Text style={styles.cardText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222831',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#393E46',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 120,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  logout: {
    backgroundColor: '#d32f2f',
  },
  cardText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: 'bold',
  },
  headerImage: {
    width: 200,
    height: 120,
    marginBottom: 10,
  },
});
