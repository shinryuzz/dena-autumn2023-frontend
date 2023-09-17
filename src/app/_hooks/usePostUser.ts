import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

type PostUserParams = {
  userId: number;
  userName: string;
};

const mutationFn = async ({ params }: { params: PostUserParams }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "answer";
  await axios.post<AxiosResponse>(baseURL + endPoint, {
    params: {
      user_id: params.userId,
      name: params.userName,
    },
  });
};

export const usePostUser = () => {
  return useMutation({ mutationFn });
};
