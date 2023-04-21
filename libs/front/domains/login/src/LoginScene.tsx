import styles from './LoginScene.module.css';
import type { LoginSceneProps } from './login';

export function LoginScene({ someValue }: LoginSceneProps) {
  return <div className={styles.home}>Hello from Login {someValue}</div>;
}
