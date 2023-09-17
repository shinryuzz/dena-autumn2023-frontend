import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useGetTheme = ({ themeId }: { themeId: string }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "theme/";
  return useQuery({
    queryKey: ["theme", themeId],
    queryFn: async () => {
      const res = await axios.get<AxiosResponse>(baseURL + endPoint + themeId);
      return res.data;
    },
  });
};
