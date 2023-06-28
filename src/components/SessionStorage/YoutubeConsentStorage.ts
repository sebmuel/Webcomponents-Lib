import { ISessionStorage } from "../Interfaces/ISessionStorage";

class YoutubeConsentStorage implements ISessionStorage<boolean> {
  getItem(key: string) {
    let value: string | null | boolean = window.localStorage.getItem(key);
    if (value !== null) {
      value = JSON.parse(value) as boolean;
    }
    return value;
  }

  setItem(key: string, value: boolean) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export const youtubeConsentStorage = new YoutubeConsentStorage();
