import * as bin from './bin';
import * as adminBin from './admin';

export const handleTabCompletion = (
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
  isLogged: boolean = false,
) => {
  const binKeys = Object.keys(bin).map((entry) => entry);
  const cmds = ['login', ...binKeys];
  if (isLogged) {
    const adminBinKeys = Object.keys(adminBin).map(entry => entry);
    cmds.push(...adminBinKeys);
    cmds.push('exit');
  }

  const commands = cmds.filter((entry) =>
    entry.startsWith(command),
  );

  if (commands.length === 1) {
    setCommand(commands[0]);
  }
};
