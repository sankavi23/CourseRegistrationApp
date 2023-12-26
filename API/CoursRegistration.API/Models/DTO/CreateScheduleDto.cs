using CoursRegistration.API.Models.Domain;

namespace CoursRegistration.API.Models.DTO
{
    public class CreateScheduleDto
    {
        public string CourseTitle {  get; set; }
        public string Day { get; set; }
        public string Time { get; set; }
        public string Instructor { get; set; }

    }
}
