import { updateDomain, createDomain, getDomain, deleteDomain } from '../../api';

const useCommand = `Použití:
admdomain [Args]

Args:
  - ls:              seznam mých registrovaných domén
  - -o, --open       otevře doménu v novém okně, musíte zadat ID domény
  - -c, --create     vytvoří novou doménu s názvem a url
  - -u, --update     upraví doménu s id na nový název nebo url
  - -d, --delete     smaže doménu s id

Příklad: 
  admdomain ls                          # seznam všech mých registrovaných domén
  admdomain -o  1                       # otevře doménu s ID 1
  admdomain -c  [nazev]|[url]           # vytvoří novou doménu s názvem a url
  admdomain -u  [id]|[nazev]|[url]      # upraví doménu s id na nový název a url 
                [id]||[url]             # upraví doménu s id na nové url, ale název zůstane
                [id]|[name]             # upraví doménu s id na nový název, ale url zůstane
  admdomain -d  [id]                    # smaže doménu s id 
`

const openCommand = `Použití: admdomain -o [id]

id domény, kterou chcete otevřít získáte příkazem domain ls`

interface Admdomain {
  id?: number;
  name?: string;
  url?: string;
}

export const admdomain = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return useCommand;
  }

  const admType = args[0];
  const admArgs = args.slice(1);
  let name = '';
  let url = '';
  let argSplit = [];
  if (admArgs.length > 0) {
    argSplit = admArgs[0].split('|');
  }

  switch (admType) {
    case 'ls':
      const domains = await getDomain();
      return domains.map(d => `${d.id}: ${d.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${d.url}" target="_blank">${d.url}</a>`).join('\n');
    case '-o':
    case '--open':
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
    case '-c':
    case '--create':
      if (argSplit.length === 2) {
        name = argSplit[0];
        url = argSplit[1];

      } else if (argSplit.length === 1) {

        name = argSplit[0];
        url = `https://www.${argSplit[0]}`
      }
      if (name && url) {
        await createDomain(name, url);
      }
      return 'Domena vytvořena';
    case '-u':
    case '--update':
      const id = argSplit[0];
      name = argSplit[1];
      url = argSplit[2];

      return await updateDomain(id, name, url);
    case '-d':
    case '--delete':
      return await deleteDomain(argSplit[0]);
  }

  return useCommand;
}
