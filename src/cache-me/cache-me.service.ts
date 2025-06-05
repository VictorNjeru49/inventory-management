import { Inject, Injectable } from '@nestjs/common';
import { CreateCacheMeDto } from './dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CacheMeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async create(createCacheMeDto: CreateCacheMeDto) {
    const { key, value, ttl } = createCacheMeDto;

    try {
      if (ttl) {
        await this.cacheManager.set(key, value, ttl * 1000);
      }
      await this.cacheManager.set(key, value);

      return {
        sucess: true,
        key,
        value,
      };
    } catch (error) {
      return {
        sucess: false,
        message: `Failed to create entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async get(key: string) {
    try {
      const value = await this.cacheManager.get(key);

      if (value === undefined || value === null) {
        return {
          success: false,
          message: `Cache entry with key '${key}' not found`,
          data: null,
        };
      }

      return {
        success: true,
        message: `Cache entry retrieved successfully`,
        data: {
          key,
          value,
        },
      };
    } catch (error) {
      return {
        sucess: false,
        message: `Failed to create entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async remove(key: string) {
    try {
      await this.cacheManager.del(key);

      return {
        success: true,
        message: `Cache entry with key '${key}' removed successfully`,
        data: { key },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to remove cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
}
