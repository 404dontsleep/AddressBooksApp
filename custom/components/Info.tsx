import { Appbar, Text } from "react-native-paper";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IInfo } from "../api/info.api";
import { useEffect, useState } from "react";
import useInfoStore from "../stores/address.store";
export default function InfoComponent() {
  const { getInfos, infos, _refresh } = useInfoStore((state) => state);
  const data = infos;
  useEffect(() => {
    getInfos();
  }, [getInfos, _refresh]);
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Address Book' />
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

function Info({ info }: { info: IInfo }) {
  const { name, address, email, phone, avatar } = info;
  const [expanded, setExpanded] = useState(false);
  return (
    <Pressable onPressOut={() => setExpanded(!expanded)}>
      <View style={styles.info}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Image
            source={{ uri: avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <Text style={{ fontSize: 18, flex: 1 }}>{phone}</Text>
          <DeleteIcon _id={info._id} />
        </View>
        {expanded && (
          <View style={{ gap: 8, marginLeft: 48 }}>
            <Text>{name}</Text>
            <Text style={{ color: "gray" }}>{address}</Text>
            <Text>{email}</Text>
          </View>
        )}
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
