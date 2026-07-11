using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
{
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder.ToTable("Permissions");

        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id)
            .ValueGeneratedNever();

        builder.Property(p => p.PermissionKey)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasIndex(p => p.PermissionKey)
            .IsUnique();

        builder.Property(p => p.PermissionNameFa)
            .HasMaxLength(300)
            .IsRequired();

        builder.Property(p => p.RiskLevel)
            .HasMaxLength(20)
            .HasDefaultValue("normal");

        builder.Property(p => p.IsActive)
            .HasDefaultValue(true);

        builder.HasOne(p => p.Group)
            .WithMany(g => g.Permissions)
            .HasForeignKey(p => p.GroupId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Ignore(p => p.DomainEvents);
    }
}
