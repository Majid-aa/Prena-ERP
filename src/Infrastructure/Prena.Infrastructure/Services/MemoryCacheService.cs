using Microsoft.Extensions.Caching.Memory;
using Prena.Application.Common.Interfaces;

namespace Prena.Infrastructure.Services;

public class MemoryCacheService : ICacheService
{
    private readonly IMemoryCache _cache;

    public MemoryCacheService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public Task<T?> GetAsync<T>(string key)
    {
        _cache.TryGetValue(key, out T? value);
        return Task.FromResult(value);
    }

    public Task SetAsync<T>(string key, T value, TimeSpan expiry)
    {
        _cache.Set(key, value, expiry);
        return Task.CompletedTask;
    }

    public Task IncrementAsync(string key, TimeSpan expiry)
    {
        if (_cache.TryGetValue<int>(key, out var value))
        {
            _cache.Set(key, value + 1, expiry);
        }
        else
        {
            _cache.Set(key, 1, expiry);
        }
        return Task.CompletedTask;
    }

    public Task RemoveAsync(string key)
    {
        _cache.Remove(key);
        return Task.CompletedTask;
    }
}
