using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Repository.implementation;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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


        [Authorize]
        [HttpGet("getAllStudents")]
        public async Task<ActionResult<User>> GetAllUsers()
        {

            return Ok(await adminRepository.GetAllUsersAsync());

        }
    }
}
