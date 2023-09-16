import { ReactNode, FC } from "react";

type Props = { children: ReactNode };

const MainContainer: FC<Props> = ({ children }) => {
  return <div className="bg-darkder">{children}</div>;
};

export default MainContainer;
