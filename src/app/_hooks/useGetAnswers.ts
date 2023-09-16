import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useGetAnswers = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "answers";
  return useQuery({
    queryKey: ["answers"],
    queryFn: async () => {
      const res = await axios.get<AxiosResponse>(baseURL + endPoint);
      return res.data;
    },
  });
};
