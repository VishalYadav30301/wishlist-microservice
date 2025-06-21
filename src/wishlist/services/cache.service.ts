export class CacheService {
  private cache = new Map<string, { data: any; timestamp: number }>();

  constructor(private readonly ttl: number) {}

  get<T>(key: string): T | undefined {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data as T;
    }
    return undefined;
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
} 