using CoursRegistration.API.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace CoursRegistration.API.Repository.Interface
{
    public interface IStudentRepository
    {
        Task<Student> CreateAsync(Student student);
        Task<ActionResult<User>> GetUserByIdAsync(Guid userId);
        //Task UpdateUserAsync(User user);
        Task<ActionResult<User>> GetUserByEmailIdAsync(string emailId);
        
    }
}
