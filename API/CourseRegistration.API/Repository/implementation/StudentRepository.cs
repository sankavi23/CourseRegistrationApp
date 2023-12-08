using CourseRegistration.API.Data;
using CourseRegistration.API.Models.Domain;
using CourseRegistration.API.Repository.Interface;

namespace CourseRegistration.API.Repository.implementation
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
    }
}
