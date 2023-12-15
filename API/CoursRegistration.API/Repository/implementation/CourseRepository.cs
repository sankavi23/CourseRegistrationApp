using CoursRegistration.API.Data;
using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Repository.Interface;

namespace CoursRegistration.API.Repository.implementation
{
    public class CourseRepository: ICourseRepository
    {
        private readonly ApplicationDbContext dbContext;
        public CourseRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Course> CreateAsync(Course course)
        {
            await dbContext.Courses.AddAsync(course);
            await dbContext.SaveChangesAsync();

            return course;


        }

    }
}
