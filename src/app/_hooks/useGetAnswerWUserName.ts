import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useGetAnswerWUserName = ({ userName }: { userName: string }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "answers";
  return useQuery({
    queryKey: ["answers", userName],
    queryFn: async () => {
      const res = await axios.get<AxiosResponse>(baseURL + endPoint, {
        params: {
          user_name: userName,
        },
      });
      return res.data;
    },
  });
};
