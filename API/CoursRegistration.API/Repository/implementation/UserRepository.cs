using CoursRegistration.API.Data;
using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;

namespace CoursRegistration.API.Repository.implementation
{
    public class UserRepository: IUserRepository
    {
        private readonly ApplicationDbContext dbContext;
        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<User> CreateAsync(User user)
        {
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<User> RetriveAsync(User userObj)
        {
            var user = await dbContext.Users
                     .FirstOrDefaultAsync(x => x.EmailId == userObj.EmailId);

            return user;
        }

        public Task<bool> CheckEmailExistAsync(string email)
            => dbContext.Users.AnyAsync(x => x.EmailId == email);

        public Task<string> CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if (password.Length < 8)
                sb.Append("Minimum Password Length Should be 8"+Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") &&Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be alphanumeric" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[! , \" , # , $ , % , & , ' , ( , ) , * , + , \\, , - , . , / , : , ; , < , = , > , ? , @ , \\[ , \\ , \\] , ^ , _ , \\ , | , { , } , ~]")))
                sb.Append("Password should contain Special Character" + Environment.NewLine);
            string result = sb.ToString();
            return Task.FromResult(result);
        }

        public async Task UpdateUserAsync(User user)
        {
            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
        }

        public async Task<ActionResult<User>> GetUserByIdAsync(Guid userId)
        {
            return await dbContext.Users.FindAsync(userId);
        }


    }
}
