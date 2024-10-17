import { Appbar, Text } from "react-native-paper";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IInfo } from "../api/info.api";
import { useEffect, useState } from "react";
import useInfoStore from "../stores/address.store";
import { Href, Link } from "expo-router";
export default function InfoComponent() {
  const { getInfos, infos, _refresh } = useInfoStore((state) => state);
  const data = infos;
  useEffect(() => {
    getInfos();
  }, [getInfos, _refresh]);
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Dữ liệu sản phẩm' />
      </Appbar.Header>
      <ScrollView>
        <View style={{ gap: 8, padding: 16 }}>
          {data.map((info) => (
            <Info key={info._id} info={info} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
function formatPhoneNumber(phoneNumberString: string) {
  const cleaned = phoneNumberString.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3,4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
}
function Info({ info }: { info: IInfo }) {
  const { name, address, email, phone, avatar } = info;
  const [expanded, setExpanded] = useState(false);
  return (
    <Pressable onPressOut={() => setExpanded(!expanded)}>
      <View style={styles.info}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Image
            source={{ uri: avatar }}
            style={{ width: 100, height: 100, borderRadius: 20 }}
          />
          <View style={{ gap: 8, marginLeft: 8, flex: 1 }}>
            <Text>Name: {name}</Text>
            <Text>Cost: {address}</Text>
            <Text>Type: {email}</Text>
          </View>
          <>
            <EditIcon _id={info._id} />
            <DeleteIcon _id={info._id} />
          </>
        </View>
      </View>
    </Pressable>
  );
}
function DeleteIcon({ _id }: { _id: string }) {
  const { deleteInfo } = useInfoStore((state) => state);
  return (
    <Pressable onPress={() => deleteInfo(_id)}>
      <Ionicons name='trash-bin-outline' size={24} color='red' />
    </Pressable>
  );
}
function EditIcon({ _id }: { _id: string }) {
  return (
    <Link href={`/edit?_id=${_id}` as Href}>
      <Ionicons name='create-outline' size={24} color='blue' />
    </Link>
  );
}
const styles = StyleSheet.create({
  info: {
    flexDirection: "column",
    gap: 16,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.25,
    justifyContent: "center",
  },
});
