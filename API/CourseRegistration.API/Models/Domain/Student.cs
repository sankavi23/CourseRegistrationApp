using System.ComponentModel.DataAnnotations;

namespace CourseRegistration.API.Models.Domain
{
    public class Student
    {
        [Key] public Guid StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public ICollection<StudentCourse> StudentCourses { get; set; }


    }
}
