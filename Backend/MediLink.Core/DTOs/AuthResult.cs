namespace MediLink.Core.DTOs
{
    public class AuthResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public int? RoleId { get; set; }
        public string? UserName { get; set; }
    }
}
