using CourseRegistration.API.Models.Domain;

namespace CourseRegistration.API.Repository.Interface
{
    public interface IScheduleRepository
    {
        Task<Schedule> CreateAsync(Schedule schedule);
    }
}
