import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useGetAnswerWUserId = ({ userId }: { userId: string }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "answers";
  return useQuery({
    queryKey: ["answers", userId],
    queryFn: async () => {
      const res = await axios.get<AxiosResponse>(baseURL + endPoint, {
        params: {
          user_id: userId,
        },
      });
      return res.data;
    },
    enabled: userId !== undefined,
  });
};
