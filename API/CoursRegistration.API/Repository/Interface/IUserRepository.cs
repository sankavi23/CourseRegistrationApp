using CoursRegistration.API.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace CoursRegistration.API.Repository.Interface
{
    public interface IUserRepository
    {
        Task<User> CreateAsync(User user);

        Task<User> RetriveAsync(User user);
        Task<bool> CheckEmailExistAsync(string email);
        Task<string> CheckPasswordStrength(string password);
        

    }
}
