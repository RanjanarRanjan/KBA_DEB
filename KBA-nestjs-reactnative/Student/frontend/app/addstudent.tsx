import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, ScrollView, Image, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function AddStudent() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };
  
  const handleSubmit = async () => {
    if (!studentId || !name || !address || !department || !phone || !image) {
      Alert.alert('Validation Error', 'All fields including image are required.');
      return;
    }

    const formData = new FormData();
    formData.append('s_id', studentId);
    formData.append('name', name);
    formData.append('department', department);
    formData.append('phoneNumber', phone);
    formData.append('address', address);

    formData.append('image', {
      uri: image.uri,
      name: 'student.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await fetch('http://192.168.128.196:5000/students', {
        method: 'POST',
        // Do NOT set Content-Type manually for FormData in React Native
        body: formData,
        credentials: 'include', // optional if using cookies
      });

      if (response.ok) {
        Alert.alert('Success', 'Student added successfully!');
        router.push('/home');
      } else {
        const errText = await response.text();
        Alert.alert('Server Error', errText);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Network Error', 'Something went wrong!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Student ID"
        value={studentId}
        onChangeText={setStudentId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.dropdown}>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue) => setDepartment(itemValue)}
          style={{ height: 50 }}
        >
          <Picker.Item label="Select Department" value="" />
          <Picker.Item label="MCom" value="MCom" />
          <Picker.Item label="BCom" value="BCom" />
          <Picker.Item label="BCA" value="BCA" />
          <Picker.Item label="MCA" value="MCA" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Text style={styles.addButtonText}>Pick Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, marginTop: 10 }} />}

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/home')}>
        <Text style={styles.addButtonText}>Back To Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
