import axios, { AxiosResponse } from "axios";

type PostAnswerParams = {
  themeId: string;
  userName: string;
  content: string;
};

type NotifySlackParams = {
  from: string;
  to: string;
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
    user_name: params.userName,
    theme_id: params.themeId,
    content: params.content,
  });
};

export const notifySlack = async ({
  params,
}: {
  params: NotifySlackParams;
}) => {
  const baseUrl =
    "https://hooks.slack.com/services/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/";
  const endPoint = "answer";
  await axios.get<AxiosResponse>(baseUrl + endPoint, {
    params: {
      from_user_name: params.from,
      to_user_name_id: params.to,
      theme_id: params.themeId,
      theme_name: params.themeName,
    },
  });
};
