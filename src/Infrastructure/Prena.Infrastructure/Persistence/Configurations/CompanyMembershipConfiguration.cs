using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class CompanyMembershipConfiguration : IEntityTypeConfiguration<CompanyMembership>
{
    public void Configure(EntityTypeBuilder<CompanyMembership> builder)
    {
        builder.ToTable("CompanyMemberships");

        // کلید ترکیبی (Composite Key)
        builder.HasKey(cm => new { cm.CompanyId, cm.UserId });

        builder.Property(cm => cm.RoleKey)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(cm => cm.IsAdmin)
            .HasDefaultValue(false);

        builder.Property(cm => cm.IsActive)
            .HasDefaultValue(true);

        builder.Property(cm => cm.JoinedAt)
            .HasDefaultValueSql("SYSUTCDATETIME()");

        // ارتباط با Company
        builder.HasOne(cm => cm.Company)
            .WithMany(c => c.Memberships)
            .HasForeignKey(cm => cm.CompanyId)
            .OnDelete(DeleteBehavior.Cascade);

        // ارتباط با User
        builder.HasOne(cm => cm.User)
            .WithMany(u => u.Memberships)
            .HasForeignKey(cm => cm.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
