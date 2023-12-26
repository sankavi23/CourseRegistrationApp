using CoursRegistration.API.Models.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoursRegistration.API.Models.DTO
{
    public class ScheduleDto
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key] public Guid ScheduleId { get; set; }
        public string CourseTitle { get; set; }
        public string Day { get; set; }
        public string Time { get; set; }
        public string Instructor { get; set; }
        public Course Course { get; set; }
        public Guid CourseId { get; set; }
    }
}
