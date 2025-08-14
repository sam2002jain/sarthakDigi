import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// Placeholder for a background image. You should replace this with a local asset.
// For now, it's a static image from an online source to match the visual.
const backgroundImage = { uri: 'https://i.imgur.com/Q6k0q3y.jpg' };

const PostCard = ({ author, time, content, tags, appreciations, comments }) => (
  <View style={postStyles.postCard}>
    <View style={postStyles.postHeader}>
      {/* Placeholder for user avatar. Use an Image component if you have user avatars. */}
      <Ionicons name="person-circle-outline" size={40} color="#333" style={postStyles.avatar} />
      <View>
        <Text style={postStyles.authorName}>{author}</Text>
        <Text style={postStyles.postTime}>{time}</Text>
      </View>
    </View>
    <Text style={postStyles.postContent}>{content}</Text>
    <View style={postStyles.tagContainer}>
      {tags.map((tag, index) => (
        <TouchableOpacity key={index} style={postStyles.tagButton}>
          <Text style={postStyles.tagText}>{tag}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={postStyles.postActions}>
      <TouchableOpacity style={postStyles.actionButton}>
        <Ionicons name="heart-outline" size={20} color="#ff69b4" />
        <Text style={postStyles.actionText}>{appreciations} Appreciations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={postStyles.actionButton}>
        <Ionicons name="chatbubble-outline" size={20} color="#333" />
        <Text style={postStyles.actionText}>{comments} Comments</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CommunityHub = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Main Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Community Hub</Text>
        </View>
      </View>
      
      {/* Background and Scrollable Content */}
      <ImageBackground source={backgroundImage} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Main Community Header */}
          <View style={styles.communityHeader}>
            <Text style={styles.communityTitle}>Indra's Luminous Web</Text>
            
            <TouchableOpacity style={styles.createPostButton}>
              <Ionicons name="add-circle-outline" size={20} color="#fff" />
              <Text style={styles.createPostText}>Create Post</Text>
            </TouchableOpacity>
          </View>
          
          {/* Feed of Community Posts */}
          <View style={styles.postFeed}>
            <PostCard
              author="Sarah J."
              time="3 hours ago"
              content="I had a profound realization today about the nature of consciousness. When we stop seeking and simply rest as awareness, everything transforms. Has anyone else experienced this shift?"
              tags={['presence', 'awareness', 'transformation']}
              appreciations={27}
              comments={8}
            />
            <PostCard
              author="Michael T."
              time="Yesterday"
              content="A practice that has helped me tremendously: pause throughout the day and simply notice what is already here. The spacious awareness that holds all experience is always available."
              tags={['practice', 'awareness']}
              appreciations={43}
              comments={12}
            />
            {/* You can add more PostCard components here */}
            <PostCard
              author="Elena R."
              time="2 days ago"
              content="Just finished a 10-day silent retreat. The inner stillness I found is beyond words. So grateful for this community and everyone's shared wisdom."
              tags={['retreat', 'stillness', 'gratitude']}
              appreciations={51}
              comments={15}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CommunityHub;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#383e58', // Dark background to match the image's top bar
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
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    padding: 15,
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5a4f78', // A darker purple shade
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 3,
  },
  createPostText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  postFeed: {
    // This view simply holds all the PostCards
  },
});

const postStyles = StyleSheet.create({
  postCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#777',
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tagButton: {
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#555',
  },
});