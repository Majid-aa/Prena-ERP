using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class PermissionGroupConfiguration : IEntityTypeConfiguration<PermissionGroup>
{
    public void Configure(EntityTypeBuilder<PermissionGroup> builder)
    {
        builder.ToTable("PermissionGroups");

        builder.HasKey(pg => pg.Id);
        builder.Property(pg => pg.Id)
            .ValueGeneratedNever();

        builder.Property(pg => pg.GroupKey)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasIndex(pg => pg.GroupKey)
            .IsUnique();

        builder.Property(pg => pg.GroupNameFa)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasOne(pg => pg.ParentGroup)
            .WithMany(pg => pg.ChildGroups)
            .HasForeignKey(pg => pg.ParentGroupId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(pg => pg.IsActive)
            .HasDefaultValue(true);

        builder.Ignore(pg => pg.DomainEvents);
    }
}
