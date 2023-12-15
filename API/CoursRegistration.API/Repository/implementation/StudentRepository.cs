using CoursRegistration.API.Data;
using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Repository.Interface;

namespace CoursRegistration.API.Repository.implementation
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
