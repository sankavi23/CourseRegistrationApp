namespace CoursRegistration.API.Models.Domain
{
    public class StudentCourse
    {
        public Guid CourseId { get; set; }
        public Guid StudentId { get; set; }

        public Student Student { get; set; }
        public Course Course { get; set;}
    }
}
