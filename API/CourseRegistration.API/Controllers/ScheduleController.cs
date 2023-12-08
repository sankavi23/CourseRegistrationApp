using CourseRegistration.API.Models.Domain;
using CourseRegistration.API.Models.DTO;
using CourseRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseRegistration.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleRepository scheduleRepository;
        public ScheduleController(IScheduleRepository scheduleRepository)
        {
            this.scheduleRepository = scheduleRepository;
        }


        [HttpPost]
        public async Task<IActionResult> CreateSchedule(CreateScheduleDto request)
        {
            var schedule = new Schedule
            {
                Day= request.Day,
                Time = request.Time,
                Instructor = request.Instructor
            };

            await scheduleRepository.CreateAsync(schedule);

            var response = new ScheduleDto
            {
                ScheduleId = schedule.ScheduleId,
                Day = schedule.Day,
                Time = schedule.Time,
                Instructor = schedule.Instructor
            };

            //do not return the domain model directly and map it to with dto
            return Ok(response);
        }
    }
}
