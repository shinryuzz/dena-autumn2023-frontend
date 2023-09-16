"use client";

import { FC, useEffect } from "react";
import { useTerminal } from "../_hooks/useTerminal";
import { useGetUsers } from "../_hooks/useGetUsers";

const TerminalWrapeer: FC = () => {
  const id = "terminal";
  const { setup } = useTerminal({ id });
  const { isError, isLoading, data, error } = useGetUsers();
  console.log(data);

  useEffect(() => {
    setup(document);
  }, []);

  return <div id={id} className="min-h-screen bg-darker text-green" />;
};

export default TerminalWrapeer;
