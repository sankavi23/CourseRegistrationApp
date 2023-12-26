using CoursRegistration.API.Data;
using CoursRegistration.API.Models.Domain;
using CoursRegistration.API.Repository.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursRegistration.API.Repository.implementation
{
    public class AdminRepository: IAdminRepository
    {
        private readonly ApplicationDbContext dbContext;
       // private readonly UserManager<User> userManager;
        public AdminRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
            //this.userManager = userManager;
        }


        //CRUD for Student
        public async Task<ActionResult<List<User>>> GetAllUsersAsync()
        {
            var users = await dbContext.Users.ToListAsync();

            return users;
        }

        //public async Task<IEnumerable<User>> GetAllUsersAsync()
        //{
        //    return await userManager.GetUsersInRoleAsync("Student");
        //}

        public bool StudentExists(Guid id)
        {
            return (dbContext.Users?.Any(e => e.UserId == id)).GetValueOrDefault();
        }

        public async Task<User> GetUserByIdAsync(Guid userId)
        {
            return await dbContext.Users.FindAsync(userId);
        }

        public async Task UpdateUserAsync(User user)
        {
            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateMyProfileAsync(User user)
        {
            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            var user = await dbContext.Users.FindAsync(userId);

            if (user != null)
            {
                dbContext.Users.Remove(user);
                await dbContext.SaveChangesAsync();
            }
        }



        //CRUD for Course
        public async Task<ActionResult<List<Course>>> GetAllCoursesAsync()
        {
            var courses = await dbContext.Courses.ToListAsync();

            return courses;
        }

        public async Task<Course> AddCourseAsync(Course course)
        {
            await dbContext.Courses.AddAsync(course);
            await dbContext.SaveChangesAsync();

            return course;
        }

        public bool CourseExists(Guid id)
        {
            return (dbContext.Courses?.Any(e => e.CourseId == id)).GetValueOrDefault();
        }

        public async Task<Course> GetCourseByIdAsync(Guid courseId)
        {
            return await dbContext.Courses.FindAsync(courseId);
        }

        public async Task UpdateCourseAsync(Course course)
        {
            dbContext.Courses.Update(course);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteCourseAsync(Guid courseId)
        {
            var course = await dbContext.Courses.FindAsync(courseId);

            if (course != null)
            {
                //dbContext.Courses.Remove(course);
                // await dbContext.SaveChangesAsync();
                dbContext.Entry(course).State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
        }



        //CRUD for Schedule

        public async Task<ActionResult<List<Schedule>>> GetAllSchedulesAsync()
        {
            var schedules = await dbContext.Schedules.ToListAsync();

            return schedules;
        }

        public async Task<Schedule> AddScheduleAsync(Schedule schedule)
        {
            var course = dbContext.Courses.FirstOrDefault(c => c.Title == schedule.CourseTitle);

            if (course != null)
            {
                // Course found, associate the schedule and add it to the course
                schedule.CourseId = course.CourseId;
                //course.Schedules.Add(schedule);

                dbContext.SaveChanges();
            }

            await dbContext.Schedules.AddAsync(schedule);
            await dbContext.SaveChangesAsync();

            return schedule;
        }

        public bool ScheduleExists(Guid id)
        {
            return (dbContext.Schedules?.Any(e => e.ScheduleId == id)).GetValueOrDefault();
        }

        public async Task<Schedule> GetScheduleByIdAsync(Guid scheduleId)
        {
            return await dbContext.Schedules.FindAsync(scheduleId);
        }

        public async Task UpdateScheduleAsync(Schedule schedule)
        {
            dbContext.Schedules.Update(schedule);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteScheduleAsync(Guid scheduleId)
        {
            var schedule = await dbContext.Schedules.FindAsync(scheduleId);

            if (schedule != null)
            {
                dbContext.Entry(schedule).State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
        }
        public async Task<Schedule> GetScheduleByCourseId(Guid courseId)
        {
            return await dbContext.Schedules
                .FirstOrDefaultAsync(s => s.CourseId == courseId);
        }


    }
}
