import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

interface Student {
  s_id: string;
  name: string;
  department: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://192.168.128.196:5000/students/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        Alert.alert('Error', 'Failed to fetch students');
        return;
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://192.168.128.196:5000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Logout failed');
        return;
      }

      Alert.alert('Logout successful!');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const renderItem = ({ item }: { item: Student }) => (
    <TouchableOpacity onPress={() => router.push(`/student/${item.s_id}`)}>
      <View style={styles.studentItem}>
        <Text style={styles.studentText}>ID: {item.s_id}</Text>
        <Text style={styles.studentText}>Name: {item.name}</Text>
        <Text style={styles.studentText}>Department: {item.department}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.s_id}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/addstudent')}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 40,
    textAlign: 'center',
  },
  studentItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  studentText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2c3e50',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});





// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useRouter } from 'expo-router';

// interface Student {
//   s_id: string;
//   name: string;
//   department: string;
// }

// export default function HomeScreen() {
//   const router = useRouter();
//   const [students, setStudents] = useState<Student[]>([]);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch('http://192.168.128.196:5000/students/all', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         Alert.alert('Error', 'Failed to fetch students');
//         return;
//       }

//       const data = await response.json();
//       setStudents(data);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://192.168.128.196:5000/auth/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         Alert.alert('Error', data.message || 'Logout failed');
//         return;
//       }

//       Alert.alert('Logout successful!');
//       router.push('/');
//     } catch (error) {
//       console.error('Logout error:', error);
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   const renderItem = ({ item }: { item: Student }) => (
//     <View style={styles.studentItem}>
//       <Text style={styles.studentText}>ID: {item.s_id}</Text>
//       <Text style={styles.studentText}>Name: {item.name}</Text>
//       <Text style={styles.studentText}>Department: {item.department}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Student List</Text>
//       <FlatList
//         data={students}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.s_id}
//       />

//       <TouchableOpacity style={styles.button} onPress={() => router.push('/addstudent')}>
//         <Text style={styles.buttonText}>Add Student</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={handleLogout}>
//         <Text style={styles.buttonText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f6fc',
//     padding: 24,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   studentItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   studentText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#2c3e50',
//     paddingVertical: 15,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
