using CoursRegistration.API.Models.Domain;

namespace CoursRegistration.API.Repository.Interface
{
    public interface IScheduleRepository
    {
        Task<Schedule> CreateAsync(Schedule schedule);
    }
}
