namespace CourseRegistration.API.Models.Domain
{
    public class Schedule
    {   
        public Guid ScheduleId { get; set; }
        public string Day { get; set; }
        public DateTime Time { get; set; }
        public string Instructor {  get; set; }
        public Course Course { get; set; }
        public string CourseCode {  get; set; }


    }
}
