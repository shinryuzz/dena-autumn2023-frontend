import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useGetAllUsers = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "users";
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get<AxiosResponse>(baseURL + endPoint);
      return res.data;
    },
  });
};
