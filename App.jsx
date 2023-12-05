import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  useColorScheme,
} from 'react-native';

const App = () => {
  const colorScheme = useColorScheme();
  const systemColorMode = colorScheme === 'dark' ? 'dark' : 'light';

  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', checked: false },
    { id: 2, text: 'Item 2', checked: false },
    { id: 3, text: 'Item 3', checked: false },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [darkMode, setDarkMode] = useState(systemColorMode === 'dark');

  const toggleCheck = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const openModal = (itemId) => {
    setEditingItem(itemId);
    setNewItemText(items.find((item) => item.id === itemId)?.text || '');
    setModalVisible(true);
  };

  const closeModal = () => {
    setEditingItem(null);
    setModalVisible(false);
    setNewItemText('');
  };

  const updateItemText = () => {
    if (newItemText.trim() !== '') {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingItem ? { ...item, text: newItemText } : item
        )
      );
      setNewItemText('');
    }
    closeModal();
  };

  const addItem = () => {
    if (newItemText.trim() !== '') {
      const newItem = {
        id: items.length + 1,
        text: newItemText,
        checked: false,
      };
      setItems([...items, newItem]);
      setNewItemText('');
    }
  };

  const clearCompleted = () => {
    setItems((prevItems) => prevItems.filter((item) => !item.checked));
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, darkMode && styles.darkHeader]}>Planit: Task Planner</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text style={[styles.darkModeToggle, darkMode && styles.darkModeToggle]}>
            {darkMode ? '🌙' : '🌞'}
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Enter Task"
        value={newItemText}
        onChangeText={(text) => setNewItemText(text)}
        onSubmitEditing={addItem}
        placeholderTextColor={darkMode ? '#666' : '#999'}
        color={darkMode ? '#fff' : '#000'}
      />
      <Button
        title="Add New Task"
        onPress={addItem}
        color={darkMode ? '#444' : '#007bff'}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleCheck(item.id)}>
            <View style={[styles.listItemContainer, item.checked && styles.checkedItem]}>
              <View style={styles.checkbox}>
                {item.checked && <Text style={styles.checkmark}>✔️</Text>}
              </View>
              <Text style={[styles.listItem, darkMode && styles.darkListItem]}>
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => openModal(item.id)}>
                <Text style={[styles.editIcon, darkMode && styles.darkEditIcon]}>✏️</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <Button
        title="Clear completed"
        onPress={clearCompleted}
        color={darkMode ? '#444' : '#dc3545'}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TextInput
            style={[styles.modalInput, darkMode && styles.darkModalInput]}
            value={newItemText}
            onChangeText={(text) => setNewItemText(text)}
            onSubmitEditing={updateItemText}
            placeholderTextColor={darkMode ? '#666' : '#999'}
            color={darkMode ? '#fff' : '#000'}
          />
          <Button title="Cancel" onPress={closeModal} color={darkMode ? '#444' : '#007bff'} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  darkContainer: {
    backgroundColor: '#111',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  darkHeader: {
    color: '#ddd',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  checkedItem: {
    backgroundColor: '#eee',
  },
  listItem: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  darkListItem: {
    color: '#888', // Adjusted to be a bit darker
  },
  editIcon: {
    fontSize: 18,
    marginLeft: 'auto',
  },
  darkEditIcon: {
    color: '#ddd',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkmark: {
    fontSize: 18,
    color: '#007bff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  darkModalInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  darkModeToggle: {
    fontSize: 24,
  },
});

export default App;
