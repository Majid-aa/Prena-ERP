using System;

namespace Prena.Domain.Entities;

public class OtpAttempt
{
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public string Mobile { get; private set; } = string.Empty;
    public string Code { get; private set; } = string.Empty;
    public DateTime ExpiresAt { get; private set; }
    public bool IsUsed { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    private OtpAttempt() { }

    public static OtpAttempt Create(string mobile, string code, int expiryMinutes)
    {
        return new OtpAttempt
        {
            Mobile = mobile,
            Code = code,
            ExpiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes),
            IsUsed = false
        };
    }

    public void MarkAsUsed()
    {
        IsUsed = true;
    }
}
