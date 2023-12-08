using CourseRegistration.API.Models.Domain;

namespace CourseRegistration.API.Repository.Interface
{
    public interface IStudentRepository
    {
        Task<Student> CreateAsync(Student student);
    }
}
