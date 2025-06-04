import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  phone: string;
  address: string;
  photo: string;
  country: string;
  state: string;
}

type RootStackParamList = {
  'User List': { newUser?: User; updatedUser?: User };
  Profile: { user?: User };
};

type UserListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User List'>;
type UserListScreenRouteProp = RouteProp<RootStackParamList, 'User List'>;

const UserListScreen = () => {
  const navigation = useNavigation<UserListScreenNavigationProp>();
  const route = useRoute<UserListScreenRouteProp>();

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Gerald Stiedemann",
      company: { name: "Metz and Sons" },
      email: "Roman66@gmail.com",
      address: "8060 Auer Estate",
      state: "Pennsylvania",
      country: "Guam",
      phone: "1-646-355-4388",
      photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Heidi Faker",
      company: { name: "Shanahan - Cartwright" },
      email: "Alta.Hand14@gmail.com",
      address: "3996 Sunny Fields",
      state: "Hawaii",
      country: "Pitcairn Islands",
      phone: "(345) 369-3735 x1278",
      photo: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Sheila Rau",
      company: { name: "Collier - Mayer" },
      email: "Lonnie_Lehner@hotmail.com",
      address: "33256 Erwin Forges",
      state: "Wyoming",
      country: "Tajikistan",
      phone: "1-466-611-1346 x8588",
      photo: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Brooke Larson",
      company: { name: "Rau - Nitzsche" },
      email: "Joanie.Frami25@gmail.com",
      address: "2182 Gleichner Landing",
      state: "Alabama",
      country: "United States of America",
      phone: "420.484.6085 x0002",
      photo: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Geovany Schowalter",
      company: { name: "Ratke, Koepp and Mosciski" },
      email: "Paul_Zieme@hotmail.com",
      address: "4347 Rempel Keys",
      state: "Arizona",
      country: "Guadeloupe",
      phone: "697.883.9259 x9902",
      photo: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Clint Feil",
      company: { name: "Jast Group" },
      email: "Koby_Towne@yahoo.com",
      address: "5778 Willms Ville",
      state: "California",
      country: "Croatia",
      phone: "1-236-348-3545 x39048",
      photo: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=200&fit=crop"
    },
    {
      id: 7,
      name: "Bernard Raynor",
      company: { name: "Swaniawski, Durgan and King" },
      email: "Broderick_Thiel99@yahoo.com",
      address: "72926 Spinka Curve",
      state: "Rhode Island",
      country: "Turks and Caicos Islands",
      phone: "1-875-684-0116 x7501",
      photo: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=200&fit=crop"
    },
    {
      id: 8,
      name: "Mittie Dickens",
      company: { name: "Schiller, DuBuque and Wilderman" },
      email: "Maryam_Franecki@gmail.com",
      address: "525 Mosciski Flat",
      state: "Oregon",
      country: "Pakistan",
      phone: "816-511-0683 x1358",
      photo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop"
    },
    {
      id: 9,
      name: "Petra Abshire",
      company: { name: "Aufderhar - Kozey" },
      email: "Laila_Konopelski52@gmail.com",
      address: "35632 Walsh Isle",
      state: "California",
      country: "Azerbaijan",
      phone: "384.819.7325",
      photo: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=400&h=200&fit=crop"
    },
    {
      id: 10,
      name: "Eveline Nikolaus",
      company: { name: "Gottlieb - Bednar" },
      email: "Haylee_Schaden@gmail.com",
      address: "7041 Dee Shores",
      state: "New Mexico",
      country: "Martinique",
      phone: "(564) 450-2135 x888",
      photo: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=200&fit=crop"
    }
  ]);

 React.useEffect(() => {
  // Handle new user addition
  if (route.params?.newUser) {
    setUsers(prevUsers => {
      // Type guard to ensure newUser exists and matches User type
      if (route.params?.newUser && isUser(route.params.newUser)) {
        return [...prevUsers, route.params.newUser];
      }
      return prevUsers;
    });
  }

  // Handle user updates
  if (route.params?.updatedUser) {
    setUsers(prevUsers => {
      // Type guard to ensure updatedUser exists and matches User type
      if (route.params?.updatedUser && isUser(route.params.updatedUser)) {
        return prevUsers.map(user => 
          user.id === route.params.updatedUser!.id ? route.params.updatedUser! : user
        );
      }
      return prevUsers;
    });
  }
}, [route.params]);

// Type guard function to validate User objects
function isUser(user: any): user is User {
  return (
    user && 
    typeof user.id === 'number' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    user.company && typeof user.company.name === 'string'
    // Add other required fields as needed
  );
}

  const navigateToEdit = (user: User) => {
  navigation.navigate('Profile', { 
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      company: { name: user.company.name },
      phone: user.phone,
      address: user.address,
      photo: user.photo,
      country: user.country,
      state: user.state
    }
  });
};

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigateToEdit(item)}
    >
      <Image source={{ uri: item.photo }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.company}>{item.company.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <MaterialIcons name="edit" size={24} color="#6200ee" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Directory ({users.length})</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Profile', { user: undefined })}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#03dac6',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6200ee',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserListScreen;