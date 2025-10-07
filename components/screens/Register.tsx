import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";

interface RegisterProps {
  navigation: NavigationProp<any>;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    // Kiểm tra dữ liệu nhập
    if (!phone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }

    // Xử lý đăng ký thành công
    Alert.alert("Đăng ký thành công", "Bạn đã đăng ký thành công với số điện thoại và email");
    navigation.navigate("Home"); // Chuyển hướng đến trang Home sau khi đăng ký
  };

  const handleSkip = () => {
    // Chuyển hướng đến trang Home mà không cần đăng ký
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
