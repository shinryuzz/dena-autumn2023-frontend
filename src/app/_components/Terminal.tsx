import { FC, useEffect, useState } from "react";
import { Terminal } from "xterm";

type Props = {
  id: string;
  rows?: number;
  cols?: number;
};

const TerminalWrapeer: FC<Props> = ({ id, cols = 80, rows = 24 }) => {
  // const [command, setCommand] = useState<string>("");
  let command: string = "";
  let currentDir = "\r\n";

  const createTerminal = (rows: number = 5, cols: number = 1): Terminal => {
    const term = new Terminal({ cursorBlink: true, cols, rows });
    term.open(document.getElementById(id)!);
    term.focus();
    return term;
  };

  const setup = () => {
    const term = createTerminal(rows, cols);
    runFakeTerminal(term);
  };

  const runFakeTerminal = (term: Terminal): void => {
    term.write("Welcome Term Park! \x1B[1;3;31mFake Terminal Now.\x1B[0m");
    term.write(currentDir + "$ ");
    term.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.key === "Enter") {
        const text: string[] = command.split(" ", 2);
        const dir = "dir"; // TODO api呼び出しに変更
        if (text[0] === "cd") {
          if (text[1] !== dir) {
            term.write(`\r\ncd: ${text[1]}: No such file or directory`);
            term.write(currentDir + "$ ");
          } else if (text[1] === dir) {
            currentDir = `${currentDir}${text[1]} `;
            term.write(currentDir + "$ ");
          } else {
            term.write(currentDir + "$ ");
          }
        } else {
          term.write(
            `\r\n${text[0]}: Command not found.  Use 'help' to see the command list.`
          );
          term.write(currentDir + "$ ");
        }
        command = "";
      } else if (ev.key === "Backspace") {
        if (term.buffer.active.cursorX > 2) {
          command = command.slice(0, -1);
          term.write("\b \b");
          console.log(command);
        }
      } else if (printable) {
        term.write(e.key);
        // setCommand(command + e.key);
        command += e.key;
        console.log(command);
      }
    });
  };

  useEffect(() => {
    setup();
  }, []);

  return <div id={id} />;
};

export default TerminalWrapeer;
