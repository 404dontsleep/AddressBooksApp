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
import NotFoundScreen from "@/app/+not-found";
import * as ImagePicker from "expo-image-picker";

const trans: { [key: string]: string } = {
  avatar: "Image",
  name: "Name",
  address: "Cost",
  email: "Type",
};
export default function EditInfoComponent({ _id }: { _id: string }) {
  const { editInfo, infos } = useInfoStore((state) => state);
  const findInfo = infos.find((info) => info._id === _id);
  if (!findInfo) {
    return <NotFoundScreen />;
  }
  const [info, setInfo] = useState<IInfo>(findInfo);
  const navigation = useNavigation();
  const handleChange = (PartialInfo: Partial<IInfo>) => {
    setInfo((state) => ({ ...state, ...PartialInfo }));
  };
  const handleSubmit = async () => {
    const { success } = await editInfo(_id, info);
    if (success) {
      if (Platform.OS === "web") {
        alert("Update successfully");
      }
      if (Platform.OS === "android") {
        Alert.alert("Update successfully");
      }
      navigation.goBack();
    }
  };
  const handleUpload = async () => {
    console.log("uploading");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera 
                 roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
      });
      console.log(result);
      setInfo((state) => ({
        ...state,
        avatar: "data:image/jpeg;base64," + (result.assets?.[0].base64 ?? ""),
      }));
    }
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.view}>
          <View style={{ alignItems: "center" }}>
            <Image source={{ uri: info.avatar }} style={styles.image} />
          </View>
          <Button onPress={handleUpload} mode='outlined'>
            Upload
          </Button>
          {Object.keys(info).map(
            (key) =>
              key !== "_id" &&
              key !== "__v" &&
              key !== "avatar" &&
              key !== "phone" && (
                <TextInput
                  keyboardType={
                    key === "phone" || key === "address"
                      ? "phone-pad"
                      : "default"
                  }
                  key={key}
                  label={
                    trans[key].slice(0, 1).toUpperCase() + trans[key].slice(1)
                  }
                  value={info[key as keyof IInfo]}
                  onChange={(e) => handleChange({ [key]: e.nativeEvent.text })}
                />
              )
          )}
          <Button mode='outlined' onPress={handleSubmit}>
            Edit
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
