﻿using CoursRegistration.API.Models.Domain;

namespace CoursRegistration.API.Models.DTO
{
    public class CreateCourseDto
    {
        public string CourseCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

    }
}
