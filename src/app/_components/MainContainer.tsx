import { ReactNode, FC } from "react";

type Props = { children: ReactNode };

const MainContainer: FC<Props> = ({ children }) => {
  // return <div className="min-h-full bg-darkder">{children}</div>;
  return <div className="">{children}</div>;
};

export default MainContainer;
