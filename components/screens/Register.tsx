import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import MParticle from 'react-native-mparticle'
import NetInfo from "@react-native-community/netinfo";



interface RegisterProps {
  navigation: NavigationProp<any>;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function isOffline() {
    const state = await NetInfo.fetch();
    return !state.isConnected;
  }

  async function identifyWithRetry(phone, email, retries = 3, delay = 2000) {
    // Nếu SDK chưa load → retry vô hạn
    if (!MParticle || !MParticle.Identity) {
      console.warn("mParticle SDK fail. Try again...");
      await new Promise(res => setTimeout(res, delay));
      return identifyWithRetry(phone, email, retries, delay);
    }
  
    // Trả về promise để chờ identify
    return new Promise((resolve, reject) => {
      const request = new MParticle.IdentityRequest();
      request.setUserIdentity(phone, MParticle.UserIdentityType.MobileNumber);
      request.setUserIdentity(email, MParticle.UserIdentityType.Email);
  
      MParticle.Identity.identify(request, async (error, userid) => {
        if (error) {
          console.warn("Identify error:", error);
  
          // Kiểm tra lỗi mạng hoặc server
          const offline = await isOffline();
          const retriable =
            error.httpCode === 429 ||
            error.httpCode >= 500 ||
            offline ||
            /Network|timeout|load/i.test(error.message);
  
          if (retriable && retries > 0) {
            console.info(`Try again ${retries - 1}`);
            setTimeout(() => {
              identifyWithRetry(phone, email, retries - 1, delay)
                .then(resolve)
                .catch(reject);
            }, delay);
            return;
          }
  
          return reject(error);
        }
  
        // Thành công
        try {
          const mpid = userid;
          console.debug("Identify success, MPID:", mpid);
          resolve(mpid);
        } catch (err) {
          console.error("Identify success but cannot get mpid:", err);
          reject(err);
        }
      });
    });
  }

  const handleSubmit = async () => {
    // Kiểm tra dữ liệu nhập
    if (!phone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
    }
    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }

    // Xử lý đăng ký thành công
    Alert.alert("Đăng ký thành công", "Bạn đã đăng ký thành công với số điện thoại và email");
    identifyWithRetry(phone, email)
      .then((mpid) => {
        console.log("Identify Success, MPID:", mpid);
        // Gọi hàm định danh Insider / hệ thống khác tại đây
        MParticle.logEvent('Register Success', MParticle.EventType.Other, {})
      })
      .catch((err) => {
        console.error("Identify fail:", err);
      });

        navigation.navigate("Home"); // Chuyển hướng đến trang Home sau khi đăng ký
      };

    const handleSkip = () => {
      // Chuyển hướng đến trang Home mà không cần đăng ký
      MParticle.logEvent('Skip Register', MParticle.EventType.Other, { 'Test key': 'Test value' })
      navigation.navigate("Home");
    };

    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Đăng Ký
        </Text>

        {/* Input nhập số điện thoại */}
        <TextInput
          label="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          mode="outlined"
        />

        {/* Input nhập email */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
        />

        {/* Button Submit */}
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Đăng Ký
        </Button>

        {/* Button Bỏ qua */}
        <Button mode="text" onPress={handleSkip} style={styles.skipButton}>
          Bỏ qua và vào Home
        </Button>
      </View>
    );
  };

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: "#f4f4f4",
    },
    title: {
      textAlign: "center",
      marginBottom: 20,
    },
    input: {
      marginBottom: 20,
    },
    button: {
      marginTop: 10,
    },
    skipButton: {
      marginTop: 15,
      alignSelf: "center",
    },
  });

  export default Register;
