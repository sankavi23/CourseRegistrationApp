﻿using CourseRegistration.API.Models.Domain;

namespace CourseRegistration.API.Models.DTO
{
    public class CreateCourseDto
    {
        public string CourseCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<StudentCourse> StudentCourses { get; set; }
        public ICollection<Schedule> Schedules { get; set; }

    }
}