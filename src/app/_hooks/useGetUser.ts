import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useGetUser = ({ userId }: { userId: string }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "users/";
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await axios.get<AxiosResponse>(baseURL + endPoint + userId);
      return res.data;
    },
  });
};
