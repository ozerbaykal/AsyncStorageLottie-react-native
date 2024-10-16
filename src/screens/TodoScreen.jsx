import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Add, CloseCircle, Edit, TickCircle, Trash} from 'iconsax-react-native';

const TodoScreen = () => {
  //input içerisindeki değer
  const [todo, setTodo] = useState('');
  //eklenilen todolar
  const [todos, setTodos] = useState([]);

  const saveTodos = async saveTodo => {
    try {
      //storage' veri kaydettik
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = id => {
    //id'si eşit olmayanaları çıkar ve bizi dizi olarak döndür
    const updatedTodos = todos.filter(item => item?.id !== id);

    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  //copleted
  const completeTodo = async id => {
    const updatedTodos = todos.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const updateTodos = id => {
    const exitingTodo = todos?.find(item => item.id === id);
    if (!exitingTodo) return;

    Alert.prompt(
      'Edit Todo',
      'Please  enter a new text!',

      newUpdateText => {
        if (newUpdateText) {
          const updateTodos = todos.map(item =>
            item?.id === id ? {...item, text: newUpdateText} : item,
          );
          setTodos(updateTodos);
          saveTodos(updateTodos);
        }
      },
      'plain-text',
      exitingTodo.text,
    );
  };

  useEffect(() => {
    //app açıldığında asyncstorage'daki todos'ı yüklüyoruz
    loadTodos();
  }, []);

  //add butonuna basıldığında çalışacak fonk.
  const addToDo = () => {
    // Giriş alanındaki metni trimleyerek boşlukları kaldır
    const trimmedTodo = todo.trim();

    // Eğer metin boşsa, uyarı ver ve işlemi durdur
    if (trimmedTodo.length === 0) {
      Alert.alert('Geçersiz Giriş', 'Lütfen bir metin giriniz!');
      return; // Boş bir todo eklenmesini engelle
    }

    // Yeni bir todo objesi oluştur ve todos state'ine aktar
    const updatedTodos = [...todos, {id: uuid.v4(), text: trimmedTodo}];

    //state'i güncelle
    setTodos(updatedTodos);
    //storage'i güncelle
    saveTodos(updatedTodos);
    setTodo(' ');
  };
  return (
    <LinearGradient colors={['#fef3c7', '#a78bfa']} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>TO-DO LIST</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={todo}
            onChangeText={text => setTodo(text)}
            placeholder="Type a todo"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={addToDo}
            style={[styles.button, styles.addButton]}>
            <Add size="42" color="#2ccce4" variant="Bold" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.copletedText,
                ]}>
                {item?.text}
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => completeTodo(item?.id)}
                    style={[styles.button, styles.completeButton]}>
                    <Text style={styles.buttonText}>
                      {item?.completed ? (
                        <CloseCircle
                          size="32"
                          color="#f47373"
                          variant="Outline"
                        />
                      ) : (
                        <TickCircle size="32" color="#37d67a" variant="Bold" />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>
                      <Trash size="32" color="#f47373" variant="Outline" />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)}
                    style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>
                      <Edit size="32" color="#37d67a" variant="Outline" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 5,
    borderRadius: 5,
  },
  addButton: {
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 10,
  },
  buttonText: {
    color: 'white',
  },

  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  deleteButton: {
    //backgroundColor: 'red',
    padding: 10,
  },
  updateButton: {
    //backgroundColor: 'green',
    padding: 10,
  },
  todoText: {
    color: '#000',
    textDecorationLine: 'none',
    fontSize: 18,
    fontWeight: 'bold',
  },
  copletedText: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
    color: 'gray',
  },
});
export default TodoScreen;
