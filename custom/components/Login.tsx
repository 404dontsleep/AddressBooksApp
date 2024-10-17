import { useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      navigation.goBack();
    }
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Đăng Nhập' />
      </Appbar.Header>
      <ScrollView>
        <TextInput
          label='Username'
          mode='flat'
          style={{ margin: 16 }}
          onChange={(e) => setUsername(e.nativeEvent.text)}
        />
        <TextInput
          label='Password'
          mode='flat'
          style={{ margin: 16 }}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        <Button mode='contained' style={{ margin: 16 }} onPress={handleLogin}>
          Đăng nhập
        </Button>
      </ScrollView>
    </>
  );
}
