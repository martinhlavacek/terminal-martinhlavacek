import { getDomain } from '../../api';

const useCommand = `Použití:
domain [Args]

Args:
  - ls:         seznam mých registrovaných domén
  - -o, --open: otevře doménu v novém okně, musíte zadat ID domény

Příklad: 
  domain ls     # seznam všech mých registrovaných domén
  domain -o 1   # otevře doménu s ID 1`

const openCommand = `Použití: domain -o [id]

id domény, kterou chcete otevřít získáte příkazem domain ls`


export const domain = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return useCommand;
  }
  switch (args[0]) {
    case 'ls':
      const domains = await getDomain();
      return domains.map(d => `${d.id}: ${d.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${d.url}" target="_blank">${d.url}</a>`).join('\n');
    case '--open':
    case '-o': {
      if (args.length === 1) {
        return openCommand;
      } else if (args.length === 2) {
        const domains = await getDomain();
        const domain = domains.find(d => d.id === +args[1]);
        if (domain) {
          window.open(domain.url, '_blank');
          return `Otevírám doménu ${domain.name}...`;
        } else {
          return `Doména s ID ${args[1]} nebyla nalezena`;
        }
      }
    }
    default: {
      return useCommand;
    }

  }
};
