import React, { useEffect, useState } from 'react';
import { commandExists } from '../../utils/commandExists';
import { useShell } from '../../utils/shellProvider';
import { handleTabCompletion } from '../../utils/tabCompletion';
import { useTheme } from '../../utils/themeProvider';
import { Ps1 } from '../ps1';
import va from '@vercel/analytics';
import { Login } from '../../utils/bin/login';


export const Input = ({ inputRef, containerRef, userLogin }) => {
  const { theme } = useTheme();
  const [value, setValue] = useState('');
  const [login, setLogin] = useState<Login>({})
  const {
    setCommand,
    history,
    lastCommandIndex,
    setHistory,
    setLastCommandIndex,
    clearHistory,
    removeLastHistory,
    callLogin,
  } = useShell();

  useEffect(() => {
    containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  const isLogin = () => {
    const lastCommand = history[history.length - 1]
    return lastCommand && lastCommand.command === 'login';
  }

  const isPassword = (login: Login) => {
    if (isLogin()) {
      return login.username && !login.password;
    }
  }

  const isLogged = () => {
    return userLogin.alias !== undefined;
  }

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: string[] = history
      .map(({ command }) => command)
      .filter((value: string) => value);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setValue('');
      setLogin({});

      setHistory('');
      setLastCommandIndex(0);
      removeLastHistory();
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      setLogin({});
      clearHistory();
    }

    if (event.key === 'Tab') {
      event.preventDefault();

      const isLogged = userLogin.alias !== undefined;
      handleTabCompletion(value, setValue, isLogged);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      if (isLogin()) {
        if (isPassword(login)) {
          callLogin(login.username, value);
          setValue('');
          setLogin({});
          return;
        } else {
          setLogin({ ...login, username: value });
        }
      } else {
        setCommand(value);
        va.track(value);
      }

      setValue('');

    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex + 1;

      if (index <= commands.length) {
        setLastCommandIndex(index);
        setValue(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex - 1;

      if (index > 0) {
        setLastCommandIndex(index);
        setValue(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setValue('');
      }
    }
  };

  return (
    <div className="flex flex-row space-x-2">
      <label htmlFor="prompt" className="flex-shrink">
        {!isLogin() && <Ps1 username={userLogin.alias} />}
        {isLogin() && !isPassword(login) ? 'username: ' : ''}
        {isPassword(login) ? 'password: ' : ''}
      </label>
      <input
        ref={inputRef}
        id="prompt"
        type={isPassword(login) ? 'password' : 'text'}
        className="focus:outline-none flex-grow"
        aria-label="prompt"
        style={{
          backgroundColor: theme.background,
          color: commandExists(value, userLogin.isLogged) || value === '' ? theme.green : theme.red,
        }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus
        onKeyDown={onSubmit}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};

export default Input;
