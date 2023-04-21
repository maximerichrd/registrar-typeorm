declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_STAGE: 'development' | 'staging' | 'production';
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_VERSION: string;
      PORT: number; // set by Nx when running serve

      NEXT_PUBLIC_BACKEND_URL: string;
    }
  }
}

// Needed to trick Typescript into thinking this file is a valid module since no import/export statements are present
export {};
