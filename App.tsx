import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post(`http://192.168.1.2:3000/chatbot`, {
        message: input
      });
      console.log(response.data);
      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error(error);
    }
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.messagesContainer} contentContainerStyle={{ flexGrow: 1 }}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
            <Text style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          style={styles.input}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
    maxWidth: '80%',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
    maxWidth: '80%',
  },
  userMessage: {
    color: '#000',
  },
  botMessage: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
  },
});

export default App;
