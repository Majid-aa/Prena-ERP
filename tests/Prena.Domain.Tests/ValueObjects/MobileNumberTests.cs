using Prena.Domain.ValueObjects;
using Prena.Domain.Exceptions;

namespace Prena.Domain.Tests.ValueObjects;

public class MobileNumberTests
{
    [Fact]
    public void Create_ValidMobile_Success() => Assert.Equal("09123456789", MobileNumber.Create("09123456789").Number);

    [Fact]
    public void Create_InvalidMobile_Throws() => Assert.Throws<DomainException>(() => MobileNumber.Create("12"));

    [Fact]
    public void Create_WithSpaces_Normalizes() => Assert.Equal("09123456789", MobileNumber.Create("0912 345 6789").Number);

    [Fact]
    public void Equals_SameNumber_True() => Assert.Equal(MobileNumber.Create("09123456789"), MobileNumber.Create("09123456789"));

    [Fact]
    public void Equals_DifferentNumber_False() => Assert.NotEqual(MobileNumber.Create("09123456789"), MobileNumber.Create("09129876543"));
}
