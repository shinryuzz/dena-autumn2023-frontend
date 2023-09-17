type User = {
  id: string;
  name: string;
  isNew: string;
};

type NotifySlackParams = {
  from: number;
  to: number;
  themeId: number;
  themeName: string;
};
