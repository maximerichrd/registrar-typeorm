import { execSync } from 'node:child_process';

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);

type NxTask = {
  id: string;
  target: {
    project: string;
    target: string;
  };
};

/**
 * https://github.com/yannickglt/nx-github-build
 */
const affected = execSync(
  `pnpm exec nx print-affected --target=${target}`
).toString('utf-8');
const tasks = JSON.parse(affected).tasks as NxTask[];
const array = tasks
  .map((t: NxTask) => t.target.project)
  .slice()
  .sort();
const sliceSize = Math.max(Math.floor(array.length / jobCount), 1);
const projects =
  jobIndex < jobCount
    ? array.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
    : array.slice(sliceSize * (jobIndex - 1));

if (projects.length > 0) {
  execSync(
    `pnpm exec nx run-many --target=${target} --projects=${projects} --parallel`,
    {
      stdio: [0, 1, 2],
    }
  );
}
