// XXX: Only export public libraries and apis.

// XXX: Barrel exporting is highly discouraged (i.e. export * from './src/auth.service')

export { AuthModule } from './src/auth.module';
export { AuthController } from './src/auth.controller';
export { AuthService } from './src/auth.service';
