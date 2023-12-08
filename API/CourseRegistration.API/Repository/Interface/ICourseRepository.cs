using CourseRegistration.API.Models.Domain;

namespace CourseRegistration.API.Repository.Interface
{
    public interface ICourseRepository
    {

        Task<Course> CreateAsync(Course course);

    }
}
