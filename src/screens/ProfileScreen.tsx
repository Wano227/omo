import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface User {
  name: string;
  age: string;
  phone: string;
  email: string;
  photo: string;
}

type RootStackParamList = {
  Profile: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  // Your personal information
  const [user, setUser] = useState<User>({
    name: 'Pascal Opara',
    age: '18',
    phone: '08036100715',
    email: 'pascalpara242@gmail.com',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  });

  const [isPickingImage, setIsPickingImage] = useState(false);

  // Updated image picker function with better error handling
  const pickImage = async () => {
    try {
      setIsPickingImage(true);
      
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your photos');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image picker result:', result); // Debugging

      // Handle the result properly
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        if (selectedAsset.uri) {
          // Add cache busting parameter to prevent caching issues
          setUser({...user, photo: `${selectedAsset.uri}?ts=${Date.now()}`});
        } else {
          throw new Error('Selected image has no URI');
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to process image. Please try again.');
    } finally {
      setIsPickingImage(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!user.age || !user.phone) {
      Alert.alert('Error', 'Please fill in all editable fields');
      return;
    }

    Alert.alert('Success', 'Your profile has been updated!');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>My Profile</Text>
        
        {/* Profile Photo with improved error handling */}
        <TouchableOpacity 
          onPress={pickImage} 
          style={styles.photoContainer}
          disabled={isPickingImage}
        >
          {user.photo ? (
            <Image 
              source={{ uri: user.photo }} 
              style={styles.profilePhoto}
              onError={(e) => {
                console.log('Image loading error:', e.nativeEvent.error);
                // Fallback to default image if selected image fails to load
                setUser({...user, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'});
              }}
            />
          ) : (
            <View style={styles.profilePhotoPlaceholder}>
              <MaterialIcons 
                name={isPickingImage ? "hourglass-empty" : "add-a-photo"} 
                size={40} 
                color="#666" 
              />
            </View>
          )}
          <Text style={styles.photoText}>
            {isPickingImage ? 'Processing...' : 'Tap to change photo'}
          </Text>
        </TouchableOpacity>

        {/* Display non-editable information */}
        <Text style={styles.label}>Full Name:</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{user.name}</Text>
        </View>
        
        <Text style={styles.label}>Email:</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        
        {/* Editable fields */}
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={user.age}
          onChangeText={(text) => setUser({...user, age: text})}
          keyboardType="numeric"
          placeholder="Enter your age"
        />
        
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={user.phone}
          onChangeText={(text) => setUser({...user, phone: text})}
          keyboardType="phone-pad"
          placeholder="Enter your phone number"
        />
        
        <Button 
          title="Update Profile" 
          onPress={handleSubmit} 
          color="#6200ee"
          disabled={isPickingImage}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profilePhotoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  photoText: {
    color: '#666',
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  infoContainer: {
    height: 50,
    borderColor: '#eee',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;