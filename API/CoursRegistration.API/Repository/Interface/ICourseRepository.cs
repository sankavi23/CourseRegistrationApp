using CoursRegistration.API.Models.Domain;

namespace CoursRegistration.API.Repository.Interface
{
    public interface ICourseRepository
    {

        Task<Course> CreateAsync(Course course);

    }
}
