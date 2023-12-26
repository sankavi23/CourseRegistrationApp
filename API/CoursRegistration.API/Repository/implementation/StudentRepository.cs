using CoursRegistration.API.Data;
using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursRegistration.API.Repository.implementation
{
    public class StudentRepository: IStudentRepository
    {
        private readonly ApplicationDbContext dbContext;
        
        public StudentRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
            
        }
        public async Task<Student> CreateAsync(Student student)
        {
            await dbContext.Students.AddAsync(student);
            await dbContext.SaveChangesAsync();

            return student;

        }

        public async Task<ActionResult<User>> GetUserByIdAsync(Guid userId)
        {
            return await dbContext.Users.FindAsync(userId);
        }

        public async Task<ActionResult<User>> GetUserByEmailIdAsync(string emailId)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.EmailId == emailId);
            return user;

        }

   


        //public async Task<ActionResult<User>> GetUserByEmailIdAsync(string userId)
        //{
        //    return await dbContext.Users.FindAsync(userId);
        //}

        //public async Task UpdateUserAsync(User user)
        //{
        //    dbContext.Users.Update(user);
        //    await dbContext.SaveChangesAsync();
        //}

    }
}
