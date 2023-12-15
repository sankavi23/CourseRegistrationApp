using CoursRegistration.API.Data;
using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursRegistration.API.Repository.implementation
{
    public class AdminRepository: IAdminRepository
    {
        private readonly ApplicationDbContext dbContext;
        public AdminRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<ActionResult<List<User>>> GetAllUsersAsync()
        {
            var users = await dbContext.Users.ToListAsync();

            return users;
        }
    }
}
