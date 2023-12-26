using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoursRegistration.API.Models.Domain
{
    public class Course
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key] public Guid CourseId {  get; set; }
        public string CourseCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<Schedule> Schedules { get; set; }
        public ICollection<User> Users { get; set; }




    }
}
