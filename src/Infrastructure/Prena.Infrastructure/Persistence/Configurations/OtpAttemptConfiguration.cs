using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class OtpAttemptConfiguration : IEntityTypeConfiguration<OtpAttempt>
{
    public void Configure(EntityTypeBuilder<OtpAttempt> builder)
    {
        builder.ToTable("OtpAttempts");

        builder.HasKey(o => o.Id);

        builder.Property(o => o.Mobile)
            .HasMaxLength(15)
            .IsRequired();

        builder.Property(o => o.Code)
            .HasMaxLength(6)
            .IsRequired();

        builder.Property(o => o.ExpiresAt)
            .IsRequired();

        builder.Property(o => o.IsUsed)
            .HasDefaultValue(false);

        builder.HasIndex(o => o.Mobile);
        builder.HasIndex(o => new { o.Mobile, o.ExpiresAt });
    }
}
