import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
interface IStatus {
  success: boolean;
  message?: string;
}
export interface IInfo {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  avatar?: string;
}
export async function GetInfos(): Promise<IStatus & { data: IInfo[] }> {
  const { data } = await axiosInstance.get("/info");
  return data;
}

export async function CreateInfo(
  info: IInfo
): Promise<IStatus & { data: IInfo }> {
  const { data } = await axiosInstance.post("/info", info);
  return data;
}
export async function DeleteInfo(
  _id: string
): Promise<IStatus & { data: IInfo }> {
  const { data } = await axiosInstance.delete(`/info/${_id}`);
  return data;
}
export async function EditInfo(
  _id: string,
  info: IInfo
): Promise<IStatus & { data: IInfo }> {
  const { data } = await axiosInstance.put(`/info/${_id}`, info);
  return data;
}

export default {
  GetInfos,
  CreateInfo,
  DeleteInfo,
  EditInfo,
};
