import { FC, useEffect } from "react";
import { Terminal } from "xterm";

type Props = {
  id: string;
  rows?: number;
  cols?: number;
};

const TerminalWrapeer: FC<Props> = ({ id, cols = 80, rows = 24 }) => {
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
    term.write("\r\n$ ");
    term.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.key === "Enter") {
        term.write("\r\n$ ");
      } else if (ev.key === "Backspace") {
        if (term.buffer.active.cursorX > 2) {
          term.write("\b \b");
        }
      } else if (printable) {
        term.write(e.key);
      }
    });
  };

  useEffect(() => {
    setup();
  }, []);

  return <div id={id} />;
};

export default TerminalWrapeer;
