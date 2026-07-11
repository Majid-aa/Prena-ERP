// src/Application/Prena.Application/Common/Interfaces/ISmsService.cs
namespace Prena.Application.Common.Interfaces;

public interface ISmsService
{
    Task SendAsync(string mobile, string message);
}