using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Models.DTO;
using CoursRegistration.API.Repository.implementation;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursRegistration.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly IAdminRepository adminRepository;
        public AdminController(IAdminRepository adminRepository)
        {
            this.adminRepository = adminRepository;
        }
        
        //STUDENT
        //[Authorize]
        [HttpGet("getAllStudents")]
        public async Task<ActionResult<User>> GetAllUsers()
        {

            return Ok(await adminRepository.GetAllUsersAsync());

        }

        [HttpGet("getStudent/{userId}")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            var user = await adminRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut("editStudent/{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId,[FromBody] EditUserDto userUpdateDto)
        {
            var user = await adminRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }
            user.FirstName = userUpdateDto.FirstName;
            user.LastName = userUpdateDto.LastName;
            user.Address = userUpdateDto.Address;
            user.PhoneNo = userUpdateDto.PhoneNo;
         
            await adminRepository.UpdateUserAsync(user);

            return Ok(user);
        }

        [HttpDelete("deleteStudent/{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            await adminRepository.DeleteUserAsync(userId);

            return NoContent();
        }


        [HttpPut("editMyProfile/{userId}")]
        public async Task<IActionResult> UpdateMyProfile(Guid userId, [FromBody] EditStudentDto userUpdateDto)
        {
            var user = await adminRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }
            user.FirstName = userUpdateDto.FirstName;
            user.LastName = userUpdateDto.LastName;
            user.EmailId = userUpdateDto.EmailId;
            user.Password = userUpdateDto.Password;
            user.Address = userUpdateDto.Address;
            user.PhoneNo = userUpdateDto.PhoneNo;

            await adminRepository.UpdateMyProfileAsync(user);

            return Ok(user);
        }

        //COURSE
        //[Authorize]
        [HttpGet("getAllCourses")]
        public async Task<ActionResult<Course>> GetAllCourses()
        {

            return Ok(await adminRepository.GetAllCoursesAsync());

        }

        [HttpPost("addCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CreateCourseDto request)
        {

            var course = new Course
            {
                CourseCode = request.CourseCode,
                Title = request.Title,
                Description = request.Description,
            };

            await adminRepository.AddCourseAsync(course);

            var response = new CourseDto
            {
                CourseId = course.CourseId,
                CourseCode = course.CourseCode,
                Title = course.Title,
                Description = course.Description
            };

            return Ok(response);
        }

        [HttpGet("getCourse/{courseId}")]
        public async Task<IActionResult> GetCourseById(Guid courseId)
        {
            var course = await adminRepository.GetUserByIdAsync(courseId);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        [HttpPut("editCourse/{courseId}")]
        public async Task<IActionResult> UpdateCourse(Guid courseId, [FromBody] EditCourseDto courseUpdateDto)
        {
            var course = await adminRepository.GetCourseByIdAsync(courseId);

            if (course == null)
            {
                return NotFound();
            }
            course.CourseCode = courseUpdateDto.CourseCode;
            course.Title = courseUpdateDto.Title;
            course.Description = courseUpdateDto.Description;



            await adminRepository.UpdateCourseAsync(course);

            return Ok(course);
        }
        [HttpDelete("deleteCourse/{courseId}")]
        public async Task<IActionResult> DeleteCourse(Guid courseId)
        {
            await adminRepository.DeleteCourseAsync(courseId);

            return NoContent();
        }




        //SCHEDULE
        //[Authorize]
        [HttpGet("getAllSchedules")]
        public async Task<ActionResult<Course>> GetAllSchedules()
        {

            return Ok(await adminRepository.GetAllSchedulesAsync());

        }


        [HttpPost("addSchedule")]
        public async Task<IActionResult> AddSchedule([FromBody] CreateScheduleDto request)
        {

            var schedule = new Schedule
            {
                CourseTitle = request.CourseTitle,
                Day = request.Day,
                Time = request.Time,
                Instructor = request.Instructor
            };


            await adminRepository.AddScheduleAsync(schedule);


            var response = new ScheduleDto
            {
                ScheduleId = schedule.ScheduleId,
                CourseTitle = schedule.CourseTitle,
                Day = schedule.Day,
                Time = schedule.Time,
                Instructor = schedule.Instructor,
                CourseId = (Guid)schedule.CourseId
            };

            return Ok(response);
        }

        [HttpPut("editSchedule/{scheduleId}")]
        public async Task<IActionResult> UpdateSchedule(Guid scheduleId, [FromBody] EditScheduleDto scheduleUpdateDto)
        {
            var schedule = await adminRepository.GetScheduleByIdAsync(scheduleId);

            if (schedule == null)
            {
                return NotFound();
            }
            schedule.CourseTitle = scheduleUpdateDto.CourseTitle;
            schedule.Day = scheduleUpdateDto.Day;
            schedule.Time = scheduleUpdateDto.Time;
            schedule.Instructor = scheduleUpdateDto.Instructor;

            await adminRepository.UpdateScheduleAsync(schedule);

            return Ok(schedule);
        }
        [HttpGet("getScheduleByCourseId/{courseId}")]
        public async Task<IActionResult> GetScheduleByCourseId(Guid courseId)
        {
            var schedule = await adminRepository.GetScheduleByCourseId(courseId);

            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }


        [HttpDelete("deleteSchedule/{scheduleId}")]
        public async Task<IActionResult> DeleteSchedule(Guid scheduleId)
        {
            await adminRepository.DeleteScheduleAsync(scheduleId);

            return NoContent();
        }

    }
}
