import * as bin from './bin';
import * as adminBin from './admin';

export const commandExists = (command: string, isLogged: boolean = false) => {
  let commands = ['clear', 'login', ...Object.keys(bin)];

  if (isLogged) {
    commands.push(...Object.keys(adminBin));
    commands.push('exit');
  }

  return commands.indexOf(command.split(' ')[0]) !== -1;
};
