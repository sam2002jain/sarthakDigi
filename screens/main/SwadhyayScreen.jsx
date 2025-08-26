import { StyleSheet, TextInput, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import React,{useState} from 'react';
import { Ionicons } from '@expo/vector-icons';



const PostCard = ({ author, time, content, tags, appreciations, comments }) => (
  <View style={postStyles.postCard}>
    <View style={postStyles.postHeader}>
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
    const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("23/08/2025");
  const [journalContent, setJournalContent] = useState("");
  const [tags, setTags] = useState("");

  const handlePlayPause = (index) => {
    if (playingIndex === index) {
      setPlayingIndex(null);
    } else {
      setPlayingIndex(index);
    }
  };

  const handleSaveExperience = () => {
    // Logic to save the recorded experience to a journal
    console.log("Recorded experience:", recordedExperience);
    setRecordedExperience(""); // Clear the text input
    setRecord(false); // Close the modal
  };

  const handleSave = () => {
    // Logic to save the journal entry
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Logic to cancel and close the modal
    setModalVisible(false);
  };


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
      <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.background}>
       
          {/* Main Community Header */}
          <View style={styles.communityHeader}>
            <Text style={styles.communityTitle}>Indra's Luminous Web</Text>
            
            <TouchableOpacity style={styles.createPostButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle-outline" size={20} color="#fff" />
              <Text style={styles.createPostText}>Create Post</Text>
            </TouchableOpacity>
          </View>

           <ScrollView contentContainerStyle={styles.scrollContainer}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView contentContainerStyle={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Title Input Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Give your entry a title"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Date Input Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="DD/MM/YYYY"
                value={date}
                onChangeText={setDate}
              />
            </View>

            {/* Journal Entry Text Area */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Post Entry</Text>
              <TextInput
                style={[styles.modalInput, styles.journalInput]}
                placeholder="What insights or experiences would you like to document?"
                multiline
                value={journalContent}
                onChangeText={setJournalContent}
              />
            </View>

            {/* Tags Input Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tags</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Add tags.."
                value={tags}
                onChangeText={setTags}
              />
            </View>

           
            

            {/* Action Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={handleCancel}
              >
                <Text style={styles.modalBtnText2}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleSave}
              >
                <Text style={styles.modalBtnText1}>Save Entry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
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
    width:'90%',
    alignSelf:'center',
    marginTop:5,
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
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  journalInput: {
    height: 150,
    textAlignVertical: "top",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#000",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalCancelBtn: {
    backgroundColor: "#fff",
    borderColor: "#dbd8d8ff",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  modalSaveBtn: {
    backgroundColor: "#5D3FD3",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  modalBtnText1: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  modalBtnText2: {
    color: "#090909ff",
    fontSize: 11,
    fontWeight: "bold",
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