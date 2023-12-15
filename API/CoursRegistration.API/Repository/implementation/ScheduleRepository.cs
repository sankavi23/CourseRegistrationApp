using CoursRegistration.API.Data;
using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Repository.Interface;

namespace CoursRegistration.API.Repository.implementation
{
    public class ScheduleRepository: IScheduleRepository
    {
        private readonly ApplicationDbContext dbContext;
        public ScheduleRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Schedule> CreateAsync(Schedule schedule)
        {
            await dbContext.Schedules.AddAsync(schedule);
            await dbContext.SaveChangesAsync();

            return schedule;


        }
    }
}
