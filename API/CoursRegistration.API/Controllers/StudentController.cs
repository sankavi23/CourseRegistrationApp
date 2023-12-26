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
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository studentRepository;
        public StudentController(IStudentRepository studentRepository)
        {
            this.studentRepository = studentRepository;
        }

        [HttpGet("getStudent/{id}")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            var user = await studentRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpGet("getStudentbyEmail/{emailId}")]
        public async Task<IActionResult> GetUserByEmailId(string emailId)
        {
            var user = await studentRepository.GetUserByEmailIdAsync(emailId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
