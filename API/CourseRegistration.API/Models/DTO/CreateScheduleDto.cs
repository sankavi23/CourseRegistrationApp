using CourseRegistration.API.Models.Domain;

namespace CourseRegistration.API.Models.DTO
{
    public class CreateScheduleDto
    {
        public string Day { get; set; }
        public DateTime Time { get; set; }
        public string Instructor { get; set; }
        public Course Course { get; set; }
        public string CourseCode { get; set; }
    }
}
