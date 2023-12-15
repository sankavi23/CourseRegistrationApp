using System.ComponentModel.DataAnnotations;

namespace CoursRegistration.API.Models.Domain
{
    public class User
    {
        [Key] public Guid UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? EmailId { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public string? PhoneNo { get; set; }
        public string? Role { get; set; }
        public string? Token { get; set; }
        public Course? Course { get; set; }
        public Guid? CourseId { get; set; }
    }
}
