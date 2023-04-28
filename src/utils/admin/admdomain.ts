const useCommand = `Pužití: domain [arg]
Args:
  - ls:               seznam mých registrovaných domén
  - -o, --open:       otevře doménu v novém okně, musíte zadat ID domény
  - -c, --create:     vytvoří novou doménu s názvem a url

Příklad: 
  domain ls                     # seznam všech mých registrovaných domén
  domain -o 1                   # otevře doménu s ID 1
  doamin -c [nazev]:[url]       # vytvoří novou doménu s názvem a url
  doamin -u [id]:[nazev]:[url]  # upraví doménu s id na nový název a url 
            [id]::[url]         # upraví doménu s id na nové url, ale název zůstane
            [id]:[name]         # upraví doménu s id na nový název, ale url zůstane
  doamin -d [id]                # smaže doménu s id 
`

export const admdomain = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return useCommand;
  }
  return useCommand;
}
