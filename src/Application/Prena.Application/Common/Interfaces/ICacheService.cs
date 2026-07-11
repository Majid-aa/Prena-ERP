// src/Application/Prena.Application/Common/Interfaces/ICacheService.cs
namespace Prena.Application.Common.Interfaces;

public interface ICacheService
{
    Task<T?> GetAsync<T>(string key);
    Task SetAsync<T>(string key, T value, TimeSpan expiry);
    Task IncrementAsync(string key, TimeSpan expiry);
    Task RemoveAsync(string key);
}