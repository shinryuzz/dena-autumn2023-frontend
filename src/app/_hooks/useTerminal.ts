import { Terminal } from "xterm";
import { useSearchParams } from "next/navigation";
import axios from "axios";

type Props = {
  id: string;
  rows?: number;
  cols?: number;
};

type UserInfo = {
  id: string;
  name: string;
  is_new: true;
};

type AnswerStyle = {
  id: string;
  content: string;
  user_id: string;
  theme_id: string;
};

const userInfo = [
  {
    id: "1000",
    name: "kakinoki",
    is_new: true,
  },
  {
    id: "2000",
    name: "kanta",
    is_new: true,
  },
];

const answer = [
  {
    id: "1",
    answer: "vscode",
    userId: "1000",
    themeId: "100",
  },
  {
    id: "2",
    answer: "C++",
    userId: "1000",
    themeId: "200",
  },
  {
    id: "3",
    answer: "ゲーム、スポーツ観戦",
    userId: "1000",
    themeId: "300",
  },
];

const theme = [
  {
    id: "100",
    name: "好きなエディタは？",
  },
  {
    id: "200",
    name: "好きな言語は？",
  },
  {
    id: "300",
    name: "趣味は？",
  },
];

export const useTerminal = ({ id, cols = 80, rows = 50 }: Props) => {
  let command: string = "";
  let currentDir = "\r\nhome ";
  let userName = "";
  let answer: AnswerStyle[];

  const createTerminal = (
    document: Document,
    rows: number = 5,
    cols: number = 1
  ) => {
    const term = new Terminal({ cursorBlink: true, cols, rows });
    term.open(document.getElementById(id)!);
    term.focus();
    return term;
  };

  const setup = (document: Document) => {
    const term = createTerminal(document, rows, cols);
    runTerminal(term);
  };

  const searchParams = useSearchParams();

  const runTerminal = (term: Terminal): void => {
    term.write("Break the ice with new team members!");
    term.write("\r\n++++++++++++++++++++++++++++++++++++");

    let isAnswerMode = false;
    let isChooseMode = false;

    if (searchParams.get("name") === null) {
      term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
    } else {
      term.write(`\r\n${searchParams.get("name")}さんからお題が届いています`);
      term.write(`\r\n英語で回答してください`);
      term.write(`\r\nお題: ${searchParams.get("theme")}\r\n`);
      isAnswerMode = true;
    }

    term.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.key === "Enter") {
        const text: string[] = command.split(" ", 2);

        if (isAnswerMode) {
          term.write(`\r\n${searchParams.get("name")}さんの回答: ${command}`);
          term.write(`\r\n${searchParams.get("name")}さんの回答を送信しました`);
          //TODO 回答を送信(api)
          // term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
          term.write("\r\n次に回答するユーザーを1人以下から選んでください");
          term.write("\r\n");
          userInfo.forEach((value) => {
            term.write(`\x1B[92m${value.name}\x1B[0m  `);
          });
          term.write("\r\n");
          isAnswerMode = false;
          isChooseMode = true;
          command = "";
          return;
        }

        if (isChooseMode) {
          const userIndex = userInfo.findIndex((value) => {
            return value.name === text[0];
          });
          if (userIndex !== -1) {
            term.write(`\r\n${command}さんにお題を送信しました`);
            //TODO お題を送信(api)
          }
          term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
          isChooseMode = false;
          command = "";
          return;
        }

        if (text[0] === "cd") {
          const asyncLs = async () => {
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
            const endPoint = "users";
            const res = await axios.get(baseURL + endPoint);
            const data = res.data as UserInfo[];
            const userIndex = data.findIndex((value) => {
              return value.name === text[1];
            });
            if (userIndex !== -1 && currentDir === "\r\nhome ") {
              userName = text[1];
              currentDir = `${currentDir}${text[1]} `;
              term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
            } else if (text[1] === ".." && currentDir !== "\r\nhome ") {
              userName = "";
              currentDir = "\r\nhome ";
              term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
            } else {
              term.write(`\r\ncd: ${text[1]}: No such file or directory`);
              term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
            }
            term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
          };
          asyncLs();
        } else if (text[0] === "ls") {
          const asyncLs = async () => {
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
            const endPoint = "users";
            const res = await axios.get(baseURL + endPoint);
            const data = res.data;
            if (currentDir === "\r\nhome ") {
              term.write("\r\n");
              data.forEach((value: any) => {
                term.write(`\x1B[92m${value.name}\x1B[0m  `);
              });
            } else {
              term.write("\r\n\x1B[92mintroduction.md\x1B[0m");
            }
            term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
          };
          asyncLs();
        } else if (text[0] === "cat") {
          if (text[1] !== "introduction.md" || currentDir === "\r\nhome ") {
            term.write(`\r\ncd: ${text[1]}: No such file or directory`);
            term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
          } else {
            const asyncCat = async () => {
              const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
              const endPoint = `answers?user_name=${userName}`;
              const res = await axios.get(baseURL + endPoint);
              answer = res.data;
              for (let i = 0; i < answer.length; i++) {
                const endPoint = `theme/${answer[i].theme_id}`;
                const res = await axios.get(baseURL + endPoint);
                const theme = res.data;
                term.write(`\r\n \x1B[96m${theme.name}\x1B[0m`);
                term.write(`\r\n \x1B[96m> ${answer[i].content}\x1B[0m`);
                term.write("\r\n");
              }
            };
            asyncCat();
            term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
          }
        } else if (text[0] === "help") {
          term.write("\r\nCommand list");
          term.write("\r\n");
          term.write("\r\n cat [file] :open txt or md files.");
          term.write("\r\n cd [file]  :change directory.");
          term.write("\r\n ls         :user list.");
          term.write("\r\n");
          term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
        } else if (term.buffer.active.cursorX < 1 + currentDir.length) {
          term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
        } else {
          term.write(
            `\r\n${text[0]}: Command not found.  Use 'help' to see the command list.`
          );
          term.write(`\x1B[93m${currentDir}\x1B[0m$ `);
        }
        command = "";
      } else if (ev.key === "Backspace") {
        if (term.buffer.active.cursorX > currentDir.length) {
          command = command.slice(0, -1);
          term.write("\b \b");
          console.log(command);
        }
      } else if (
        ev.key === "Delete" ||
        ev.key === "End" ||
        ev.key === "Home" ||
        ev.key === "ArrowDown" ||
        ev.key === "ArrowLeft" ||
        ev.key === "ArrowRight" ||
        ev.key === "ArrowUp"
      ) {
        console.log("cannot use key");
      } else if (printable) {
        term.write(e.key);
        command += e.key;
        console.log(command);
      }
    });
  };

  return { setup, createTerminal, runTerminal };
};
