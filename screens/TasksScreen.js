import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';

const TasksScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      Alert.alert('Error', 'Tugas tidak boleh kosong');
      return;
    }

    const task = {
      text: newTask,
      deadline: deadline.toDateString(),
    };

    setTasks(prevTasks => [...prevTasks, task]);
    setNewTask('');
    setDeadline(new Date());
  };

  const handleDeleteTask = index => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus tugas ini?', [
      {text: 'Batal'},
      {
        text: 'Hapus',
        onPress: () => {
          const updatedTasks = tasks.filter((_, i) => i !== index);
          setTasks(updatedTasks);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#222831" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        {/* Tombol kembali ke Dashboard */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={20} color="#fff" />
          <Text style={styles.backText}>Kembali ke Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Daftar Tugas</Text>

        {/* Input tugas baru */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tambahkan tugas baru..."
            placeholderTextColor="#aaa"
            value={newTask}
            onChangeText={setNewTask}
          />
        </View>

        {/* Deadline */}
        <View style={styles.deadlineRow}>
          <MaterialCommunityIcons name="calendar" size={24} color="#00ADB5" />
          <Text style={styles.deadlineLabel}>
            Deadline: {deadline.toDateString()}
          </Text>
          <TouchableOpacity
            onPress={() => setOpenDatePicker(true)}
            style={styles.dateButton}>
            <Text style={styles.dateButtonText}>Pilih Tanggal</Text>
          </TouchableOpacity>
        </View>

        {/* Tombol tambah tugas */}
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Daftar tugas */}
        {tasks.map((task, index) => (
          <View key={index} style={styles.card}>
            <MaterialCommunityIcons
              name="clipboard-text"
              size={26}
              color="#00ADB5"
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.cardText}>{task.text}</Text>
              <Text style={styles.deadlineText}>Deadline: {task.deadline}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteTask(index)}>
              <MaterialCommunityIcons
                name="trash-can"
                size={24}
                color="#D32F2F"
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* DatePicker Modal */}
        <DatePicker
          modal
          open={openDatePicker}
          date={deadline}
          onConfirm={date => {
            setOpenDatePicker(false);
            setDeadline(date);
          }}
          onCancel={() => setOpenDatePicker(false)}
          mode="date"
          theme="dark"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222831',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FB9E3A',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#393E46',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    height: 48,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deadlineLabel: {
    color: '#fff',
    marginLeft: 10,
  },
  dateButton: {
    marginLeft: 10,
    backgroundColor: '#00ADB5',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 6.65,
    elevation: 10,
  },
  dateButtonText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#00ADB5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#393E46',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  deadlineText: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 4,
  },
});
