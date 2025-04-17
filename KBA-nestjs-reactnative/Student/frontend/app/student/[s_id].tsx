import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function StudentDetail() {
  const router = useRouter();
  const { s_id } = useLocalSearchParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`http://192.168.128.196:5000/students/${s_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        Alert.alert('Error', 'Failed to fetch student');
        return;
      }

      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error('Fetch student error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this student?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.128.196:5000/students/${s_id}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                Alert.alert('Error', 'Failed to delete student');
                return;
              }

              const result = await response.json();
              Alert.alert('Success', result.message);
              router.push('/home');
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Something went wrong during deletion');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!student) {
    return <Text style={{ marginTop: 50 }}>Student not found</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Back to Home Button at Top */}
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Student Details</Text>

      <Image
        style={styles.image}
        source={{
          uri: student.image
            ? `data:image/jpeg;base64,${student.image}`
            : 'https://via.placeholder.com/150',
        }}
      />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{student.name}</Text>

        <Text style={styles.label}>Student ID:</Text>
        <Text style={styles.value}>{student.s_id}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{student.phoneNumber || 'Not Available'}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{student.address || 'Not Available'}</Text>

        <Text style={styles.label}>Department:</Text>
        <Text style={styles.value}>{student.department}</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Update Student" onPress={() => router.push(`/student/update/${student.s_id}`)} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Delete Student" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    marginBottom: 5,
  },
});
