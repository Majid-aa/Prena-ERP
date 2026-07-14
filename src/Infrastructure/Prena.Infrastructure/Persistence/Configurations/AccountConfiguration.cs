using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.ToTable("Accounts");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).ValueGeneratedNever();
        builder.Property(a => a.Code).HasMaxLength(50).IsRequired();
        builder.HasIndex(a => a.Code).IsUnique();
        builder.Property(a => a.Name).HasMaxLength(200).IsRequired();
        builder.Property(a => a.Nature).HasMaxLength(20).IsRequired();
        builder.Property(a => a.IsActive).HasDefaultValue(true);
        builder.HasOne(a => a.Parent).WithMany(a => a.Children).HasForeignKey(a => a.ParentId).OnDelete(DeleteBehavior.Restrict);
    }
}