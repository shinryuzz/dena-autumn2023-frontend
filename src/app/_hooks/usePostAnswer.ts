import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

type PostAnswerParams = {
  themId: number;
  userId: number;
  content: string;
};

const mutationFn = async ({ params }: { params: PostAnswerParams }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "answer";
  await axios.post<AxiosResponse>(baseURL + endPoint, {
    params: {
      user_id: params.userId,
      theme_id: params.themId,
      content: params.content,
    },
  });
};

export const usePostAnswer = () => {
  return useMutation({ mutationFn });
};
