using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id)
            .ValueGeneratedNever();

        // OwnsOne برای Value Object MobileNumber
        builder.OwnsOne(u => u.Mobile, mobile =>
        {
            mobile.Property(m => m.Number)
                .HasColumnName("Mobile")
                .HasMaxLength(15)
                .IsRequired();

            mobile.HasIndex(m => m.Number)
                .IsUnique();
        });

        builder.Property(u => u.FullName)
            .HasMaxLength(200);

        builder.Property(u => u.PasswordHash)
            .HasMaxLength(255);

        builder.Property(u => u.IsSuperAdmin)
            .HasDefaultValue(false);

        builder.Property(u => u.IsActive)
            .HasDefaultValue(true);

        builder.Property(u => u.CreatedAt)
            .HasDefaultValueSql("SYSUTCDATETIME()");

        builder.Ignore(u => u.DomainEvents);
    }
}
