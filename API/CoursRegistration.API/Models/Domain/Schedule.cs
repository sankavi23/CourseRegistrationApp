using System.ComponentModel.DataAnnotations.Schema;

namespace CoursRegistration.API.Models.Domain
{
    public class Schedule
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ScheduleId { get; set; }
        public string CourseTitle { get; set; }
        public string Day { get; set; }
        public string Time { get; set; }
        public string Instructor {  get; set; }
        public Course Course { get; set; }
        public Guid CourseId {  get; set; }


    }
}
