using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prena.Domain.Entities;

namespace Prena.Infrastructure.Persistence.Configurations;

public class AgentLevelConfiguration : IEntityTypeConfiguration<AgentLevel>
{
    public void Configure(EntityTypeBuilder<AgentLevel> builder)
    {
        builder.ToTable("AgentLevels");

        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id)
            .ValueGeneratedNever();

        builder.Property(a => a.LevelKey)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(a => a.LevelKey)
            .IsUnique();

        builder.Property(a => a.LevelNameFa)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(a => a.MaxWaiveAmount)
            .HasPrecision(18, 2)
            .HasDefaultValue(0);

        builder.Property(a => a.IsActive)
            .HasDefaultValue(true);
    }
}
