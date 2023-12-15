using System.ComponentModel.DataAnnotations;

namespace CoursRegistration.API.Models.Domain
{
    public class Course
    {
        [Key] public Guid CourseId {  get; set; }
        public string? CourseCode { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public ICollection<Schedule> Schedules { get; set; }
        public ICollection<User> Users { get; set; }


        public ICollection<StudentCourse> StudentCourses { get; set; }









    }
}
