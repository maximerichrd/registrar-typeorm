# Demo - Registrar

This project was generated using [PES](https://github.com/faberNovel/fabernovel-pes)
following this great [lightning on PES](https://www.notion.so/fabernovel/PES-8132fe0de6e9449f8facfa08b07fecaf#f4639a29c3d84f7f9c51921ca246f420)


Take it as a dev project to experiment with [TypeORM](https://typeorm.io) and [NestJS](https://docs.nestjs.com).

swagger_preview.jpg<img width="1635" alt="image" src="https://user-images.githubusercontent.com/81571408/233919917-d517e532-0386-477f-9ea4-70be0ec1e04a.png">


## Getting started

Use a recent nodeJS version (>= 18.12.0) using [nvm](https://formulae.brew.sh/formula/nvm) with `nvm use v18.16.0`

Install dependencies using [pnpm](https://formulae.brew.sh/formula/pnpm) with `pnpm install`

### Backend application

1. Start the Docker Postgres DB: `docker-compose -f support/docker/docker-compose.yml up -d`
2. Copy the .env and set the application secrets in a `apps/back/.env.local` file
```sh
...content copied from .env...

# secrets
DB_USERNAME=test
DB_PASSWORD=password
DB_DATABASE=testdb
```
3. Build back end app: `pnpm exec nx run back:build`
4. Run the database migrations: `pnpm exec nx run back:migration-migrate`
5. Start back end app: `pnpm exec nx run back:serve`
6. Swagger should then be available on `http://localhost:3333/api#/`


## For those who may experiment too

### Git commits
For now, all commits will fail if not using the `--no-verify` option:
Probably because we did not setup correctly yet. 
See last section below: Configuring commitlint

### Migrations

Migrations provide a way to incrementally update the database schema to keep it in sync with the application's data model while preserving existing data in the database. To generate, run, and revert migrations, TypeORM provides a dedicated CLI.

#### Create a new migration

To create an empty migration run the following command: `pnpm exec nx run <<appDirectory>>:migration-create --name=<<any_name>>`. Prefer the automatic migration, cf below.

#### Generate a migration from existing table schema

Automatic migration generation creates a new migration file and writes all sql queries that must be executed to update the database.
If no there were no changes generated, the command will exit with code 1.
To generate a migration run the following command: `pnpm exec nx run <<appDirectory>>:migration-generate --name=<<any_name>>`.
The rule of thumb is to generate a migration after each entity change.

Migrations will be generated in `apps/<<project_name>>/src/app/typeorm/migrations/`.

Your entities must be created in `libs/<<appDirectory>>/shared/data-<<database_name>>/src/entities` where <<database_name>> is, for instance, equal to 'postgres'.
Entities file name must end with `entity.ts`, ie: `user.entity.ts`.
To achieve it you can simply create a shared lib using: `pnpm exec nx g @fabernovel/pes-nx-plugin-nest:library data-<<database_name>> --shared --appName <<appDirectory>> --controller=false --module=false`

#### Run migrations

To execute all pending migrations use following command: `pnpm exec nx run <<appDirectory>>:migration-migrate`.

#### Revert migrations

To revert the most recently executed migration use the following command: `pnpm exec nx run <<appDirectory>>:migration-revert`.

### Frontend application

1. Build front end app: `pnpm exec nx run front:build`
2. Start front end app: `pnpm exec nx run front:serve`

## Adding capabilities to your workspace

See [PES user documentation](https://github.com/faberNovel/fabernovel-pes/tree/main/documentation)

## Configuring commitlint

The commitlint configuration is set in the `commitlint.config.js` file at root level.

The default commit message pattern is: `/^(\w*)(\(([A-Z].*)-\d+\))?:\s(.*)$/`

See [conventionalcommits documentation](https://www.conventionalcommits.org/) to customize the pattern.
See [Commintling config documentation](https://commitlint.js.org/#/) to configure commitlint


