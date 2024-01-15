import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// npx expo start --tunnel

export default function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Math.random().toString(),
        text: task,
        completed: false,
      },
    ]);

    setTask('');
  };

  const markAsCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  }

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add a new task'
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <Button title='Add' onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text
              style={{
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}
            >
              {item.text}
            </Text>
            <View style={styles.taskButtons}>
              <Button
                title={item.completed ? 'Undo' : 'Complete'}
                onPress={() => markAsCompleted(item.id)}
              />
              <Button title='Delete' onPress={() => deleteTask(item.id)} color='red' />
            </View>
          </View>
        )}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {

  },
  input: {

  },
  taskItem: {

  },
  taskButtons: {

  },
});
