import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarScreen = ({navigation}) => {
  const handleDayPress = day => {
    alert(`Tanggal dipilih: ${day.dateString}`);
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

        <Text style={styles.title}>Kalender</Text>

        <Calendar
          onDayPress={handleDayPress}
          theme={{
            backgroundColor: '#222831',
            calendarBackground: '#222831',
            textSectionTitleColor: '#FB9E3A',
            selectedDayBackgroundColor: '#00ADB5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00ADB5',
            dayTextColor: '#ffffff',
            textDisabledColor: '#555',
            arrowColor: '#FB9E3A',
            monthTextColor: '#ffffff',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontWeight: 'bold',
          }}
          markedDates={{
            '2025-06-16': {marked: true, dotColor: '#FB9E3A'},
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

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
    marginBottom: 20,
    width: 100,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
