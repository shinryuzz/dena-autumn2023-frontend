import axios, { AxiosResponse } from "axios";

type PostAnswerParams = {
  themeId: string;
  userName: string;
  content: string;
};

type NotifySlackParams = {
  from: number;
  to: number;
  themeId: string;
  themeName: string;
};

export const getTheme = async ({ themeId }: { themeId: string }) => {
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
    // params: {
    // user_id: params.userName,
    user_id: "4",
    // theme_id: params.themId,
    theme_id: "theme_id_2",
    content: params.content,
    // },
  });
};

export const notifySlack = async ({
  params,
}: {
  params: NotifySlackParams;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "answer";
  await axios.get<AxiosResponse>(baseUrl + endPoint, {
    params: {
      from_user_name: 1,
      theto_user_nameme_id: 1,
      theme_id: params.themeId,
      theme_name: "お題1",
    },
  });
};
