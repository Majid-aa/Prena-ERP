using Microsoft.EntityFrameworkCore;
using Prena.Application.Common.Interfaces;
using Prena.Domain.Entities;
using System.Reflection;

namespace Prena.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<CompanyMembership> CompanyUsers => Set<CompanyMembership>();
    public DbSet<OtpAttempt> OtpCodes => Set<OtpAttempt>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<PermissionGroup> PermissionGroups => Set<PermissionGroup>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    public DbSet<AgentLevel> AgentLevels => Set<AgentLevel>();

    IQueryable<User> IApplicationDbContext.Users => Users.AsQueryable();
    IQueryable<Company> IApplicationDbContext.Companies => Companies.AsQueryable();
    IQueryable<CompanyMembership> IApplicationDbContext.CompanyUsers => CompanyUsers.AsQueryable();
    IQueryable<OtpAttempt> IApplicationDbContext.OtpCodes => OtpCodes.AsQueryable();
    IQueryable<Role> IApplicationDbContext.Roles => Roles.AsQueryable();
    IQueryable<Permission> IApplicationDbContext.Permissions => Permissions.AsQueryable();

    void IApplicationDbContext.Add<TEntity>(TEntity entity) => Add(entity);
    void IApplicationDbContext.Update<TEntity>(TEntity entity) => Update(entity);
    void IApplicationDbContext.Remove<TEntity>(TEntity entity) => Remove(entity);

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
