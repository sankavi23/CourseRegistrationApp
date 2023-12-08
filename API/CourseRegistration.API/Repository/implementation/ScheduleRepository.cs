using CourseRegistration.API.Data;
using CourseRegistration.API.Models.Domain;
using CourseRegistration.API.Repository.Interface;

namespace CourseRegistration.API.Repository.implementation
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
