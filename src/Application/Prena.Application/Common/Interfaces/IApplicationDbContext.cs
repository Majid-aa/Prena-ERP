using Prena.Domain.Entities;

namespace Prena.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    // مجموعه‌های قابل کوئری
    IQueryable<User> Users { get; }
    IQueryable<Company> Companies { get; }
    IQueryable<CompanyMembership> CompanyUsers { get; }
    IQueryable<OtpAttempt> OtpCodes { get; }
    IQueryable<Role> Roles { get; }
    IQueryable<Permission> Permissions { get; }

    // متدهای دستکاری داده
    void Add<TEntity>(TEntity entity) where TEntity : class;
    void Update<TEntity>(TEntity entity) where TEntity : class;
    void Remove<TEntity>(TEntity entity) where TEntity : class;
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
