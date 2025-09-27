import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const quickbutton = [
  {
    id: 1,
    title: "Wall of Proud",
    icon: <Ionicons name="trophy-outline" size={24} color="black" />,
    screen: "ManchEkParichay",
  },
  {
    id: 2,
    title: "Wall of Fame",
    icon: <Ionicons name="people-circle-outline" size={24} color="black" />,
    screen: "WallOfFrame",
  },
  {
    id: 3,
    title: "Moments",
    icon: <Ionicons name="camera-outline" size={24} color="black" />,
    screen: "AVMPal",
  },
  {
    id: 4,
    title: "Published Books",
    icon: <Ionicons name="book-outline" size={24} color="black" />,
    screen: "PubBook",
  },
];

const morequickbutton = [
  {
    id: 5,
    title: "Written Collection",
    icon: <Ionicons name="pencil-outline" size={24} color="black" />,
    screen: "WrittenCollection",
  },
  {
    id: 6,
    title: "Prashan Manch",
    icon: <Ionicons name="help-outline" size={24} color="black" />,
    screen: "PrashanManch",
  },
  {
    id: 7,
    title: "Prabhavna Manch",
    icon: <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />,
    screen: "Prabhavna",
  },
  {
    id: 8,
    title: "Sadbhavna Manch",
    icon: <Ionicons name="happy-outline" size={24} color="black" />,
    screen: "SadbhavnaManch",
  },
  {
    id: 9,
    title: "Quiz",
    icon: <Ionicons name="hourglass-outline" size={24} color="black" />,
    screen: "Quizselection",
  },
];

const OtherButtons = [
  {
    id: 1,
    title: "Social links",
    icon: <Ionicons name="share-social-outline" size={24} color="black" />,
    screen: "Otherlink",
  },
  {
    id: 2,
    title: "Title Song",
    icon: <Ionicons name="musical-notes-outline" size={24} color="black" />,
  },
  {
    id: 3,
    title: "Contact Us",
    icon: <Ionicons name="call-outline" size={24} color="black" />,
    screen: "Profile",
  },
];

const HomeScreen = ( props) => {
    const { navigation } = props;

  const [showMore, setShowMore] = useState(false); // state for toggle

  // Merge quickbutton and morequickbutton when expanded
  const displayedButtons = showMore
    ? [...quickbutton, ...morequickbutton]
    : quickbutton;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#0c0c0cff" />

      {/* Top Gradient */}
      <LinearGradient
        colors={["#00C853", "#FFFFFF", "#FFD600"]}
        style={styles.topGradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginLeft: 20, flexDirection: "column", gap: 10 }}>
            <Image
              source={require("../../assets/image.png")}
              style={styles.logo}
            />
            <Text style={{ textAlign: "center" }}>since 2014</Text>
          </View>
          <View style={styles.logotextcontainer}>
            <Text style={styles.ojmtxt}>Online जैन मंच</Text>
            <Text style={styles.ojmsubtxt}>एक कदम सिद्धत्व की ओर</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Quick Actions Section */}
        <View style={styles.quickLinks}>
          <Text style={styles.quickLinksText}>Quick Actions</Text>
        </View>

        <View style={styles.extraContent}>
          {/* More / Less Toggle */}
          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginRight: 10, marginTop: 10 }}
            onPress={() => setShowMore(!showMore)}
          >
            <Text style={{ color: "black", fontWeight: "500", fontSize: 14 }}>
              {showMore ? "Less" : "More"}
            </Text>
          </TouchableOpacity>

          {/* Quick Buttons Grid */}
          <View style={styles.extraContent2}>
            {displayedButtons.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  marginVertical: 5,
                  width: 70,
                }}
              >
                <TouchableOpacity style={{ alignItems: "center", gap: 5 }} onPress={()=>navigation.navigate(item.screen)}>
                  {item.icon}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      flexWrap: "wrap",
                    }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.extraContent}>
          <View style={styles.extraContent2}>
            {OtherButtons.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  marginVertical: 5,
                  width: 70,
                }}
              >
                <TouchableOpacity style={{ alignItems: "center", gap: 5 }} onPress={()=>navigation.navigate(item.screen)}>
                  {item.icon}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      flexWrap: "wrap",
                    }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: -1,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 20,
    borderRadius: 10,
  },
  logotextcontainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 10,
    paddingRight: 20,
  },
  ojmtxt: {
    fontSize: 34,
    fontWeight: "600",
    color: "#193ca5ff",
  },
  ojmsubtxt: {
    fontSize: 16,
    fontWeight: "600",
    color: "#323131bb",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 100,
  },
  scrollContent: {
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    height: 100,
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  quickLinks: {
    paddingVertical: 10,
  },
  quickLinksText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  extraContent: {
    marginTop: 20,
    paddingVertical: 0,
    paddingHorizontal: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  extraContent2: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 2,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
});
