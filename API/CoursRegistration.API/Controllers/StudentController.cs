using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Models.DTO;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoursRegistration.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository studentRepository;
        public StudentController(IStudentRepository studentRepository)
        {
            this.studentRepository = studentRepository;
        }


        [HttpPost]
        public async Task<IActionResult> CreateStudent(CreateStudentDto request)
        {
            var student = new Student
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                EmailId = request.EmailId,
                Password = request.Password,
                Address = request.Address,
                PhoneNo = request.PhoneNo
            };

            await studentRepository.CreateAsync(student);

            var response = new StudentDto
            {
                StudentId = student.StudentId,
                FirstName = student.FirstName,
                LastName = student.LastName,
                EmailId = student.EmailId,
                Password = student.Password,
                Address = student.Address,
                PhoneNo = student.PhoneNo
            };

            //do not return the domain model directly and map it to with dto
            return Ok(response);
        }

    }
}
