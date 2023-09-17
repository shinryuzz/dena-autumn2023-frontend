import { FC, useEffect } from "react";
import { useTerminal } from "../_hooks/useTerminal";
import { useGetUser } from "../_hooks/useGetUser";

const TerminalWrapeer: FC = () => {
  const id = "terminal";
  const { isError, isLoading, data, error } = useGetUser();
  console.log(data);
  const { setup } = useTerminal({ id, data });

  useEffect(() => {
    setup(document);
  }, []);

  return <div id="terminal" className="min-h-screen bg-darker text-green" />;
};

export default TerminalWrapeer;
