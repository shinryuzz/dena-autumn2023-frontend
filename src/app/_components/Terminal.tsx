"use client";

import { FC, useEffect } from "react";
import { useTerminal } from "../_hooks/useTerminal";

import { useGetAllUsers } from "../_hooks/useGetAllUsers";

const TerminalWrapeer: FC = () => {
  const id = "terminal";
  const { isError, isLoading, data, error } = useGetAllUsers();
  const { setup } = useTerminal({ id });
  console.log(data);

  useEffect(() => {
    setup(document);
  }, []);

  return <div id={id} className="min-h-screen bg-darker text-green" />;
};

export default TerminalWrapeer;
