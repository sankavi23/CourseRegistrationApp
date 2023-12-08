namespace CourseRegistration.API.Models.Domain
{
    public class Admin
    { 
        public Guid Id {  get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
    }
}
