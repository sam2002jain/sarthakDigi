import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const initialPosts = [
  {
    id: '1',
    user: 'Deepak Jain',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Very insightful discourse on Jainism today. 🙏 #Jainism #Spirituality',
    likes: 12,
    comments: 5,
    isLiked: false,
  },
  {
    id: '2',
    user: 'Priya jain',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'Participated in a wonderful Seva activity. Feeling blessed. #Seva #Community',
    likes: 25,
    comments: 10,
    isLiked: true,
  },
  {
    id: '3',
    user: 'Rohan jain',
    profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
    content: 'Sharing a beautiful thought from Acharanga Sutra: "The man who is pure will soon find the truth." #Jainism #Ahimsa',
    likes: 8,
    comments: 2,
    isLiked: false,
  },
];

const PrabhavnaScreen = (props) => {
  const {navigation} = props;
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState(initialPosts);

  const handlePost = () => {
    if (newPostContent.trim() === '') {
      Alert.alert('Empty Post', 'Please write something before posting.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      user: 'You', // Assuming the logged-in user is 'You'
      profilePic: 'https://randomuser.me/api/portraits/men/4.jpg', // Placeholder for the current user's pic
      content: newPostContent,
      likes: 0,
      comments: 0,
      isLiked: false,
    };
    setPosts([newPost, ...posts]); // Add new post to the top of the list
    setNewPostContent(''); // Clear the input field
    Alert.alert('Success', 'Your post has been published!');
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleShare = (post) => {
    // Implement native share functionality
    Alert.alert('Share', `Sharing this post by ${post.user}`);
    // Example: Share.share({ message: post.content });
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
        <Text style={styles.userName}>{item.user}</Text>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Ionicons
            name={item.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={item.isLiked ? '#ff6347' : '#555'}
          />
          <Text style={styles.actionText}>{item.likes} Likes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#555" />
          <Text style={styles.actionText}>{item.comments} Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShare(item)}
        >
          <Ionicons name="share-social-outline" size={24} color="#555" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
              <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Prabhavna</Text>
              </View>
            </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles.createPostContainer}>
            <Text style={styles.createPostTitle}>Share Your Thoughts</Text>
            <View style={styles.postInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="What's on your mind?..."
                multiline
                value={newPostContent}
                onChangeText={setNewPostContent}
              />
              <TouchableOpacity
                style={styles.postButton}
                onPress={handlePost}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default PrabhavnaScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 45, // Add more padding for the status bar area
    backgroundColor: '#3d424dff',
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    top: 45,
    padding: 5,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  createPostContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  createPostTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 80,
    maxHeight: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  postButton: {
    backgroundColor: '#5a4f78',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Blog Post Card Styles
  postCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
});