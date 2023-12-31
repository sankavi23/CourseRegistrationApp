﻿using CoursRegistration.API.Models.Domain;
using System.ComponentModel.DataAnnotations;

namespace CoursRegistration.API.Models.DTO
{
    public class UserRegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }

        public string Role = "Student";
        
    }
}
