export interface CacheRepository {
  Get(value: string): Promise<string | null>;
  Set(key: string, value: string): Promise<void>;
}
