using Azure.Core;
using CoursRegistration.API.Data;
using CoursRegistration.API.Helpers;
using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Models.DTO;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace CoursRegistration.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /*private readonly ApplicationDbContext dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();

                var user = await dbContext.Users
                    .FirstOrDefaultAsync(x=>x.EmailId==userObj.EmailId && x.Password==userObj.Password);

                if (user == null)
                    return NotFound(new { Message = "User Not Found!" });

            return Ok(new { Message = "Login Success" });

            
        }

        [HttpPost("register")]

        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            await dbContext.Users.AddAsync(userObj);
            await dbContext.SaveChangesAsync();
            return Ok(new { Message = "User Register" });
        }*/

        private readonly IUserRepository userRepository;
        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterDto request)
        {
            if (await userRepository.CheckEmailExistAsync(request.EmailId))
                return BadRequest(new { Message = "Email Id already Exist!" });

            var pass = await userRepository.CheckPasswordStrength(request.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new {Message = pass});

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                EmailId = request.EmailId,
                Password = PasswordHasher.HashPassword(request.Password),
                Address = request.Address,
                PhoneNo = request.PhoneNo,
                Role = "Student"
            };

            await userRepository.CreateAsync(user);

            var response = new UserDto
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                EmailId = user.EmailId,
                Password = user.Password,
                Address = user.Address,
                PhoneNo = user.PhoneNo,
                Role = user.Role
            };

            return Ok(response);
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserLoginDto userObj)
        {
            if (userObj == null)
                return BadRequest();

            var loginUser = new User
            {
                EmailId = userObj.EmailId,
                Password = userObj.Password
            };

            var user = await userRepository.RetriveAsync(loginUser);
            if (user == null)
                return NotFound(new { Message = "User Not Found!" });

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
                return BadRequest(new { Message = "Password is incorrect!" });

            user.Token = CreateJwt(user);
            return Ok(new { 
                Token = user.Token,
                Message = "Login Success"
            });

        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

    }
}
