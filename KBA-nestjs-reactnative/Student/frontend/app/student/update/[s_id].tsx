import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function UpdateStudent() {
  const { s_id } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    department: '',
    phoneNumber: '',
    address: '',
  });

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`http://192.168.128.196:5000/students/${s_id}`);
      const data = await response.json();
      setForm({
        name: data.name,
        department: data.department,
        phoneNumber: data.phoneNumber || '',
        address: data.address || '',
      });

      if (data.image) {
        setImage(`data:image/jpeg;base64,${data.image}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load student');
      console.error(error); // Debugging line
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'You need to allow access to your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      console.log('Selected image base64:', asset.base64); // Debugging line
      setImage(`data:image/jpeg;base64,${asset.base64}`);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    // Append text fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Handle image field: If new image is picked, append it as a blob
    if (image) {
      if (image.startsWith('data:image')) {
        const base64Data = image.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        formData.append('image', blob as any, 'photo.jpg');
      } else {
        formData.append('existingImage', image); // key name should match backend expectations
      }
    }

    try {
      console.log('Sending form data:', formData); // Debugging line
      const response = await fetch(`http://192.168.128.196:5000/students/${s_id}`, {
        method: 'PUT',
        body: formData as any,
      });

      if (!response.ok) {
        Alert.alert('Error', 'Failed to update student');
        return;
      }

      Alert.alert('Success', 'Student updated successfully');
      router.push(`/student/${s_id}`);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error); // Debugging line
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Update Student</Text>

      <Text style={styles.label}>Student ID: {s_id}</Text>

      {Object.keys(form).map((key) => (
        <TextInput
          key={key}
          placeholder={key}
          value={form[key as keyof typeof form]}
          onChangeText={(value) => handleChange(key, value)}
          style={styles.input}
        />
      ))}

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={{ marginVertical: 10 }}>
        <Button title="Pick Image" onPress={pickImage} />
      </View>

      <Button title="Update" onPress={handleUpdate} disabled={!form.name} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
