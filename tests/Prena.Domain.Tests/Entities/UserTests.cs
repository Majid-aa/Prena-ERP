using Prena.Domain.Entities;
using Prena.Domain.ValueObjects;

namespace Prena.Domain.Tests.Entities;

public class UserTests
{
    [Fact]
    public void Create_SetsProperties()
    {
        var u = User.Create(MobileNumber.Create("09123456789"), "Ali");
        Assert.Equal("Ali", u.FullName);
        Assert.True(u.IsActive);
    }

    [Fact]
    public void Deactivate_SetsInactive()
    {
        var u = User.Create(MobileNumber.Create("09123456789"));
        u.Deactivate();
        Assert.False(u.IsActive);
    }

    [Fact]
    public void Activate_SetsActive()
    {
        var u = User.Create(MobileNumber.Create("09123456789"));
        u.Deactivate();
        u.Activate();
        Assert.True(u.IsActive);
    }

    [Fact]
    public void RecordLogin_UpdatesTimestamp()
    {
        var u = User.Create(MobileNumber.Create("09123456789"));
        u.RecordLogin();
        Assert.NotNull(u.LastLoginAt);
    }
}
