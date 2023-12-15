using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Models.DTO;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoursRegistration.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {

        private readonly ICourseRepository courseRepository;
        public CourseController(ICourseRepository courseRepository)
        {
            this.courseRepository = courseRepository;
        }


        [HttpPost]
        public async Task<IActionResult> CreateCourse(CreateCourseDto request)
        {
            var course = new Course
            {
                CourseCode = request.CourseCode,
                Title = request.Title,
                Description = request.Description
            };

            await courseRepository.CreateAsync(course);

            var response = new CourseDto
            {
                CourseId = course.CourseId,
                CourseCode = course.CourseCode,
                Title = course.Title,
                Description = course.Description
            };

            //do not return the domain model directly and map it to with dto
            return Ok(response);
        }
    }
}
