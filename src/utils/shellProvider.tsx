import React, { useEffect } from 'react';
import { History } from '../interfaces/history';
import * as bin from './bin';
import * as adminBin from './admin';
import { useTheme } from './themeProvider';
import { Login, login, loginUser, getLoggedUser } from './bin/login';
import { logout } from './admin/logout'
interface ShellContextType {
  history: History[];
  userLogin: Login;
  command: string;
  lastCommandIndex: number;

  setHistory: (output: string) => void;
  setCommand: (command: string) => void;
  setLastCommandIndex: (index: number) => void;
  execute: (command: string) => Promise<void>;
  clearHistory: () => void;
  removeLastHistory: () => void;
  callLogin: (username: string, password: string) => void;
}

const ShellContext = React.createContext<ShellContextType>(null);

interface ShellProviderProps {
  children: React.ReactNode;
}

export const useShell = () => React.useContext(ShellContext);

export const ShellProvider: React.FC<ShellProviderProps> = ({ children }) => {
  const [init, setInit] = React.useState(true);
  const [history, _setHistory] = React.useState<History[]>([]);
  const [command, _setCommand] = React.useState<string>('');
  const [lastCommandIndex, _setLastCommandIndex] = React.useState<number>(0);
  const { theme, setTheme } = useTheme();
  const [userLogin, setUserLogin] = React.useState<Login>({});

  useEffect(() => {
    setCommand('banner');
    async function checkAuthentication() {
      const user = await getLoggedUser();
      setUserLogin(user);
    }

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (!init) {
      execute();
    }
  }, [command, init]);

  const setHistory = (output: string) => {
    _setHistory([
      ...history,
      {
        id: history.length,
        date: new Date(),
        command: command.split(' ').slice(1).join(' '),
        output,
      },
    ]);
  };

  const removeLastHistory = () => {
    const newHistory = history.slice(0, history.length - 1);
    _setHistory(newHistory);
  };

  const setCommand = (command: string) => {
    _setCommand([Date.now(), command].join(' '));

    setInit(false);
  };

  const clearHistory = () => {
    _setHistory([]);
  };
  const callLogin = async (username: string, password: string) => {
    const userData = await loginUser(username, password);
    if (userData.alias === null) {

      setHistory('Login failed. Try again.');

    } else {
      setUserLogin(userData);
      setCommand('clear');
    }
  }
  const setLastCommandIndex = (index: number) => {
    _setLastCommandIndex(index);
  };

  const execute = async () => {
    const [cmd, ...args] = command.split(' ').slice(1);

    const isLogged = userLogin.isLogged;

    switch (cmd) {
      case 'theme':
        const output = await bin.theme(args, setTheme);

        setHistory(output);

        break;
      case 'clear':
        clearHistory();
        break;
      case '':
        setHistory('');
        break;
      case 'login':
        const loginData = await login(args);
        setHistory(loginData);
        break;
      case 'exit':
        if (!isLogged) {
          setHistory(`Command not found: ${cmd}. Try 'help' to get started.`);
        } else {
          await logout();
          setUserLogin({});
          setCommand('clear');
        }
        break;
      default: {
        let commands = Object.keys(bin);
        let adminCommands = Object.keys(adminBin);
        if (isLogged) {
          commands = commands.concat(adminCommands);

        }

        if (commands.indexOf(cmd) === -1) {
          setHistory(`Command not found: ${cmd}. Try 'help' to get started.`);
        } else {
          try {
            let output = '';
            const isAdminCommand = adminCommands.indexOf(cmd) !== -1;
            if (isAdminCommand) {
              output = await adminBin[cmd](args, isLogged);
            } else {
              output = await bin[cmd](args, isLogged);
            }
            setHistory(output);
          } catch (error) {
            setHistory(error.message);
          }
        }
      }
    }
  };

  return (
    <ShellContext.Provider
      value={{
        history,
        userLogin,
        command,
        lastCommandIndex,
        setHistory,
        setCommand,
        setLastCommandIndex,
        execute,
        clearHistory,
        removeLastHistory,
        callLogin,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
};
