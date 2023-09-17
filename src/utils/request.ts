import axios, { AxiosResponse } from "axios";

type PostAnswerParams = {
  themId: number;
  userName: string;
  content: string;
};

export const getTheme = async ({ themeId }: { themeId: number }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "theme/";
  const res = await axios.get<AxiosResponse>(baseURL + endPoint + themeId);
  return res.data;
};

export const getAllUsers = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "users";
  const res = await axios.get(baseUrl + endPoint);
  return res.data;
};

export const postAnswer = async ({ params }: { params: PostAnswerParams }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "answer";
  await axios.post<AxiosResponse>(baseUrl + endPoint, {
    params: {
      // user_id: params.userName,
      user_id: 1,
      // theme_id: params.themId,
      theme_id: 1,
      content: params.content,
    },
  });
};
