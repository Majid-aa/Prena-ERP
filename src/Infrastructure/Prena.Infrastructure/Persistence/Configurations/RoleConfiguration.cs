using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("Roles");

        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id)
            .ValueGeneratedNever();

        builder.Property(r => r.RoleKey)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasIndex(r => r.RoleKey)
            .IsUnique();

        builder.Property(r => r.RoleNameFa)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(r => r.RoleScope)
            .HasMaxLength(20)
            .HasDefaultValue("company");

        builder.HasOne(r => r.ParentRole)
            .WithMany(r => r.ChildRoles)
            .HasForeignKey(r => r.ParentRoleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(r => r.IsSystemRole)
            .HasDefaultValue(false);

        builder.Property(r => r.IsActive)
            .HasDefaultValue(true);

        builder.Ignore(r => r.DomainEvents);
    }
}
