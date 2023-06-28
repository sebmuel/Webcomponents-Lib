export interface ISessionStorage<T> {
  getItem(key: string): T | null;
  setItem(key: string, value: T): void;
}
