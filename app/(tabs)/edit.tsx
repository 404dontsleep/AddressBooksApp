import EditInfoComponent from "@/custom/components/EditInfo";
import { useLocalSearchParams } from "expo-router";
import NotFoundScreen from "../+not-found";
import useInfoStore from "@/custom/stores/address.store";

export default function EditTab() {
  const { _id } = useLocalSearchParams<{ _id: string }>();
  const { infos } = useInfoStore((state) => state);
  if (infos.some((info) => info._id === _id)) {
    return <EditInfoComponent _id={_id} />;
  }
  return <NotFoundScreen />;
}
