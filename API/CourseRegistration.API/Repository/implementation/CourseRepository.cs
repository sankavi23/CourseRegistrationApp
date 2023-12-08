using CourseRegistration.API.Data;
using CourseRegistration.API.Models.Domain;
using CourseRegistration.API.Repository.Interface;

namespace CourseRegistration.API.Repository.implementation
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
