USE CoursRegistrationDb;

SELECT * FROM Users;

SELECT * FROM Courses;

SELECT * FROM Schedules;

DELETE FROM Schedules
WHERE Instructor = 'Dr.Nuwantha Perera';

UPDATE Users
SET Role = 'Admin'
WHERE FirstName='Admin';

INSERT INTO Courses (CourseCode, Title, Description)
VALUES ('SE001', 'Software Engineering', 'Comprehensive study of software engineering principles and methodologies.');


-- Change the data type of a column in a table
ALTER TABLE Schedules
ALTER COLUMN Time varchar(20);
