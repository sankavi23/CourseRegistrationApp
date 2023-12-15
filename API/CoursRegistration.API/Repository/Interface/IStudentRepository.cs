using CoursRegistration.API.Models.Domain;

namespace CoursRegistration.API.Repository.Interface
{
    public interface IStudentRepository
    {
        Task<Student> CreateAsync(Student student);
    }
}
