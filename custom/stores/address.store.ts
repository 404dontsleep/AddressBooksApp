import { create } from "zustand";
import { IInfo } from "../api/info.api";
import InfoFunction from "../api/info.api";

interface IInfoStore {
  infos: IInfo[];
  getInfos: () => Promise<void>;
  createInfo: (info: IInfo) => Promise<{ success: boolean }>;
  deleteInfo: (_id: string) => Promise<{ success: boolean }>;
  editInfo: (_id: string, info: IInfo) => Promise<{ success: boolean }>;
  _refresh: number;
  refresh: () => void;
}

const useInfoStore = create<IInfoStore>((set, get) => ({
  infos: [],
  _refresh: 0,
  refresh: () => set((state) => ({ _refresh: state._refresh + 1 })),
  getInfos: async () => {
    const infos = await InfoFunction.GetInfos();
    if (infos.success) set({ infos: infos.data });
  },
  createInfo: async (info) => {
    const createdInfo = await InfoFunction.CreateInfo(info);
    if (createdInfo.success) get().refresh();
    return createdInfo;
  },
  deleteInfo: async (_id) => {
    const deletedInfo = await InfoFunction.DeleteInfo(_id);
    if (deletedInfo.success) get().refresh();
    return deletedInfo;
  },
  editInfo: async (_id, info) => {
    const updatedInfo = await InfoFunction.EditInfo(_id, info);
    if (updatedInfo.success) get().refresh();
    return updatedInfo;
  },
}));

export default useInfoStore;
