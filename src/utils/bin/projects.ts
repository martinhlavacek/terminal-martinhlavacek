import { getProjects } from '../../api';

export const myrepo = async (args: string[]): Promise<string> => {
  const projects = await getProjects();
  console.log(projects)
  return projects
    .filter((repo) => !repo.fork)
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};
