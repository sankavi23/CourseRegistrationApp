using CoursRegistration.API.Models.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoursRegistration.API.Models.DTO
{
    public class CourseDto
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key] public Guid CourseId { get; set; }
        public string CourseCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<ScheduleDto> Schedules { get; set; }

    }
}
