using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
    public void Configure(EntityTypeBuilder<Company> builder)
    {
        builder.ToTable("Companies");

        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .ValueGeneratedNever();

        builder.Property(c => c.TenantId)
            .IsRequired();

        builder.HasIndex(c => c.TenantId)
            .IsUnique();

        builder.Property(c => c.CompanyName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(c => c.Slug)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasIndex(c => c.Slug)
            .IsUnique();

        builder.Property(c => c.IndustryType)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(c => c.PlanType)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.Status)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.TenantType)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.RegistrationSource)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.CreatedAt)
            .HasDefaultValueSql("SYSUTCDATETIME()");

        builder.Ignore(c => c.DomainEvents);
    }
}
