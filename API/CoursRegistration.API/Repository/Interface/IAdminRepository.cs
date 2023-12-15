using CoursRegistration.API.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace CoursRegistration.API.Repository.Interface
{
    public interface IAdminRepository
    {
        Task<ActionResult<List<User>>> GetAllUsersAsync();
    }
}
