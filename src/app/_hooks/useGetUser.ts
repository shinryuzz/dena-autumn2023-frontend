import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "users";

  const res = await axios.get(baseUrl + endPoint);
  return res.data;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
