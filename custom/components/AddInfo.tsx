import useInfoStore from "../stores/address.store";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { IInfo } from "../api/info.api";
import { useState } from "react";
import { useNavigation } from "expo-router";

export default function AddInfoComponent() {
  const { createInfo } = useInfoStore((state) => state);
  const navigation = useNavigation();
  const [info, setInfo] = useState<IInfo>({
    avatar: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
    name: "",
    address: "",
    email: "",
    phone: "",
  } as IInfo);
  const handleChange = (PartialInfo: Partial<IInfo>) => {
    setInfo((state) => ({ ...state, ...PartialInfo }));
  };
  const handleSubmit = async () => {
    const { success } = await createInfo(info);
    if (success) {
      if (Platform.OS === "web") {
        console.log(info);
        alert("Info added successfully");
        navigation.goBack();
      }
      if (Platform.OS === "android") {
        Alert.alert("Info added successfully");
      }
    }
  };
  return (
    <>
      <Appbar.BackAction
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.view}>
          <View style={{ alignItems: "center" }}>
            <Image source={{ uri: info.avatar }} style={styles.image} />
          </View>
          {Object.keys(info).map(
            (key) =>
              key !== "_id" && (
                <TextInput
                  keyboardType={key === "phone" ? "phone-pad" : "default"}
                  key={key}
                  label={key.slice(0, 1).toUpperCase() + key.slice(1)}
                  value={info[key as keyof IInfo]}
                  onChange={(e) => handleChange({ [key]: e.nativeEvent.text })}
                />
              )
          )}
          <Button mode='outlined' onPress={handleSubmit}>
            Add
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, gap: 16, padding: 32 },
  image: { width: 200, height: 200, borderRadius: 100 },
});
