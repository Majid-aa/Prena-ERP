using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class VoucherConfiguration : IEntityTypeConfiguration<Voucher>
{
    public void Configure(EntityTypeBuilder<Voucher> builder)
    {
        builder.ToTable("Vouchers");
        builder.HasKey(v => v.Id);
        builder.Property(v => v.VoucherNumber).HasMaxLength(50).IsRequired();
        builder.Property(v => v.Description).HasMaxLength(500);
        builder.Property(v => v.Status).HasMaxLength(20).HasDefaultValue("draft");
        builder.HasMany(v => v.Lines).WithOne(l => l.Voucher).HasForeignKey(l => l.VoucherId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class VoucherLineConfiguration : IEntityTypeConfiguration<VoucherLine>
{
    public void Configure(EntityTypeBuilder<VoucherLine> builder)
    {
        builder.ToTable("VoucherLines");
        builder.HasKey(l => l.Id);
        builder.Property(l => l.Debit).HasPrecision(18, 4);
        builder.Property(l => l.Credit).HasPrecision(18, 4);
        builder.Property(l => l.Description).HasMaxLength(500);
    }
}
