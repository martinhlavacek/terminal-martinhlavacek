import packageJson from '../../../package.json';
import * as bin from './index';

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');

  return `Prikazy:\n${commands}\n\n[tab]\t dokonceni prikazu.\n[ctrl+l] vymazani terminalu.\n[ctrl+c] ukonceni prikazu.`;
};

export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return 'guest';
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

// export const gui = async (args: string[]): Promise<string> => {
//   window.open('https://m4tt72.com', '_self');

//   return 'Opening GUI version...';
// };

export const email = async (args: string[]): Promise<string> => {
  window.open('mailto:martin@martinhlavacek.cz');

  return 'Opening mailto:martin@martinhlavacek.cz...';
};

// export const vi = async (args: string[]): Promise<string> => {
//   return `why use vi? try 'emacs'.`;
// };

// export const vim = async (args: string[]): Promise<string> => {
//   return `why use vim? try 'emacs'.`;
// };

// export const emacs = async (args?: string[]): Promise<string> => {
//   return `really? emacs? you should be using 'vim'`;
// };

// export const sudo = async (args?: string[]): Promise<string> => {
//   setTimeout(function() {
//     window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
//   }, 1000);

//   return `Permission denied: unable to run the command '${args[0]}' as root.`;
// };

export const terminalrepo = async (args?: string[]): Promise<string> => {
  setTimeout(function() {
    window.open(packageJson.repository.url, '_blank');
  }, 1000);

  return 'Opening repository...';
};

const subtitle = `
--
Tento stránka je open-source projekt 🎉 podívat se může do mého repository po zadnání příkazu 'terminalrepo'.
--
`;
const backupSubtitle = `
New 🎉: 2Try out the new 'theme' command. See all available themes <a href="https://github.com/m4tt72/terminal/tree/master/docs/themes">in the docs</a>.
New 🎉: New command 'neofetch', for you linux.

`;

export const banner = (args?: string[]): string => {
  return `

███╗░░░███╗░█████╗░██████╗░████████╗██╗███╗░░██╗  ██╗░░██╗██╗░░░░░░█████╗░██╗░░░██╗░█████╗░░█████╗░███████╗██╗░░██╗
████╗░████║██╔══██╗██╔══██╗╚══██╔══╝██║████╗░██║  ██║░░██║██║░░░░░██╔══██╗██║░░░██║██╔══██╗██╔══██╗██╔════╝██║░██╔╝
██╔████╔██║███████║██████╔╝░░░██║░░░██║██╔██╗██║  ███████║██║░░░░░███████║╚██╗░██╔╝███████║██║░░╚═╝█████╗░░█████═╝░
██║╚██╔╝██║██╔══██║██╔══██╗░░░██║░░░██║██║╚████║  ██╔══██║██║░░░░░██╔══██║░╚████╔╝░██╔══██║██║░░██╗██╔══╝░░██╔═██╗░
██║░╚═╝░██║██║░░██║██║░░██║░░░██║░░░██║██║░╚███║  ██║░░██║███████╗██║░░██║░░╚██╔╝░░██║░░██║╚█████╔╝███████╗██║░╚██╗
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝╚═╝░░╚══╝  ╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝░╚════╝░╚══════╝╚═╝░░╚═╝ v${packageJson.version}

Napiš 'help' k zobrazení dostupných příkazů.
${subtitle}
`;
};
