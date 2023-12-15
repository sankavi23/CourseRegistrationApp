using CoursRegistration.API.Models.Domain;

namespace CoursRegistration.API.Models.DTO
{
    public class CourseDto
    {
        public Guid CourseId { get; set; }
        public string CourseCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<StudentCourse> StudentCourses { get; set; }
        public ICollection<Schedule> Schedules { get; set; }

    }
}
