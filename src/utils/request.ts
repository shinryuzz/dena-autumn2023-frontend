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
  const baseURL = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL as string;

  await fetch(baseURL, {
    method: "post",
    body: JSON.stringify({
      text:
        `${
          "https://dena-autumn2023-frontend.vercel.app/" +
          "?from_user_name=" +
          params.from +
          "&to_user_name=" +
          params.to
        }` +
        "&theme_id=" +
        params.themeId +
        "&theme_name=" +
        params.themeName,
    }),
  }).then((x) => {
    console.log(x);
  });
};
