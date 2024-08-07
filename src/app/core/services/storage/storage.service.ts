import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set<T>(key: string, value: T) {
    const json = { value };
    return localStorage.setItem(key, JSON.stringify(json));
  }
  get<T>(key: string): T | null {
    const data: string | null = localStorage.getItem(key);
    if (!data) return null;

    const parsedData = JSON.parse(data);
    return parsedData.value as T;
  }

  async remove(key: string) {
    return localStorage.removeItem(key);
  }
}
