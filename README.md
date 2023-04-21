# Demo

This project was generated using [PES](https://github.com/faberNovel/fabernovel-pes)

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/faberNovel/fabernovel-pes/tree/main/documentation/images/PES_logo_lightMode.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/faberNovel/fabernovel-pes/tree/main/documentation/images/PES_logo_darkMode.svg">
  <img alt="PES Logo" src="https://github.com/faberNovel/fabernovel-pes/tree/main/documentation/images/PES_logo_lightMode.svg" width="200">
</picture>

## CI

The CI workflow might need to be slightly adapted regarding the number of projects. Check `.github/workflows/pr.yml` and adjust the `jobIndex` array and the `JOB_COUNT` variable.
It is used by the Github actions matrix strategy to determine the number of jobs to run in parallel. Make sure `jobIndex` and `JOB_COUNT` are always in sync.

[More here](https://medium.com/emoteev-blog/10x-faster-ci-with-nx-and-github-actions-9a51fc4e82a6)

## Adding capabilities to your workspace

See [PES user documentation](https://github.com/faberNovel/fabernovel-pes/tree/main/documentation)

## Configuring commitlint

The commitlint configuration is set in the `commitlint.config.js` file at root level.

The default commit message pattern is: `/^(\w*)(\(([A-Z].*)-\d+\))?:\s(.*)$/`

See [conventionalcommits documentation](https://www.conventionalcommits.org/) to customize the pattern.
See [Commintling config documentation](https://commitlint.js.org/#/) to configure commitlint

## Getting started

Install dependencies with `pnpm install`

### Backend application

1. Start the Docker stack: `cd support/docker && docker-compose up`
2. Set the application secrets in a `apps/<<appDirectory>>/.env.local` file (in most cases appDirectory is named 'back')
3. Build back end app: `pnpm exec nx run <<appDirectory>>:build`
4. Run the database migrations: `pnpm exec nx run <<appDirectory>>:migration-migrate`
5. Start back end app: `pnpm exec nx run <<appDirectory>>:serve`

#### Migrations

Migrations provide a way to incrementally update the database schema to keep it in sync with the application's data model while preserving existing data in the database. To generate, run, and revert migrations, TypeORM provides a dedicated CLI.

##### Create a new migration

To create an empty migration run the following command: `pnpm exec nx run <<appDirectory>>:migration-create --name=<<any_name>>`.

##### Generate a migration from existing table schema

Automatic migration generation creates a new migration file and writes all sql queries that must be executed to update the database.
If no there were no changes generated, the command will exit with code 1.
To generate a migration run the following command: `pnpm exec nx run <<appDirectory>>:migration-generate --name=<<any_name>>`.
The rule of thumb is to generate a migration after each entity change.

Migrations will be generated in `apps/<<project_name>>/src/app/typeorm/migrations/`.

Your entities must be created in `libs/<<appDirectory>>/shared/data-<<database_name>>/src/entities` where <<database_name>> is, for instance, equal to 'postgres'.
Entities file name must end with `entity.ts`, ie: `user.entity.ts`.
To achieve it you can simply create a shared lib using: `pnpm exec nx g @fabernovel/pes-nx-plugin-nest:library data-<<database_name>> --shared --appName <<appDirectory>> --controller=false --module=false`

##### Run migrations

To execute all pending migrations use following command: `pnpm exec nx run <<appDirectory>>:migration-migrate`.

##### Revert migrations

To revert the most recently executed migration use the following command: `pnpm exec nx run <<appDirectory>>:migration-revert`.

### Frontend application

1. Build front end app: `pnpm exec nx run front:build`
2. Start front end app: `pnpm exec nx run front:serve`
