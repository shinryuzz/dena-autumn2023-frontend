"use client";

import { FC, useEffect } from "react";
import { useTerminal } from "../_hooks/useTerminal";

const TerminalWrapeer: FC = () => {
  const id = "terminal";
  const { setup } = useTerminal({ id });

  useEffect(() => {
    setup(document);
  }, []);

  return <div id={id} className="min-h-screen bg-darker text-green" />;
};

export default TerminalWrapeer;
