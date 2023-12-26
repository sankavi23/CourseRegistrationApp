using CoursRegistration.API.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace CoursRegistration.API.Repository.Interface
{
    public interface IAdminRepository
    {
        Task<ActionResult<List<User>>> GetAllUsersAsync();
        //Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid userId);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(Guid userId);
        Task UpdateMyProfileAsync(User user);


        Task<ActionResult<List<Course>>> GetAllCoursesAsync();
        Task<Course> AddCourseAsync(Course course);
        Task<Course> GetCourseByIdAsync(Guid courseId);
        Task UpdateCourseAsync(Course course);
        Task DeleteCourseAsync(Guid courseId);



        Task<ActionResult<List<Schedule>>> GetAllSchedulesAsync();
        Task<Schedule> AddScheduleAsync(Schedule schedule);
        Task<Schedule> GetScheduleByIdAsync(Guid scheduleId);
        Task UpdateScheduleAsync(Schedule schedule);
        Task DeleteScheduleAsync(Guid scheduleId);
        Task<Schedule> GetScheduleByCourseId(Guid courseId);

    }
}
