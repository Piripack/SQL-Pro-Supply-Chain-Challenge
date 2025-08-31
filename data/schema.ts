
export const schemaSql = `
-- Drop tables if they exist to ensure a clean slate
DROP TABLE IF EXISTS ProjectAssignments;
DROP TABLE IF EXISTS PerformanceReviews;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Departments;
DROP TABLE IF EXISTS Projects;

-- create departments table
CREATE TABLE Departments (
    departmentId INT PRIMARY KEY,
    departmentName VARCHAR(50) NOT NULL,
    location VARCHAR(50)
);

-- create employees table with better naming conventions
CREATE TABLE Employees (
    employeeId INT PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    departmentId INT,
    hireDate DATE,
    monthlySalary DECIMAL(10,2),
    hasChildren BIT,
    holidaysBalance INT,
    dateOfBirth DATE,
    sickLeaveBalance INT,
    FOREIGN KEY (departmentId) REFERENCES Departments(departmentId)
);

-- create performance reviews table
CREATE TABLE PerformanceReviews (
    reviewId INT PRIMARY KEY,
    employeeId INT,
    reviewDate DATE,
    rating INT, -- Rating out of 5
    disciplinaryAction VARCHAR(20) DEFAULT 'None',
    notes TEXT,
    FOREIGN KEY (employeeId) REFERENCES Employees(employeeId)
);

-- create projects table
CREATE TABLE Projects (
    projectId INT PRIMARY KEY,
    projectName VARCHAR(100),
    startDate DATE,
    endDate DATE,
    budget DECIMAL(15,2)
);

-- create a join table for many-to-many relationship between employees and projects
CREATE TABLE ProjectAssignments (
    assignmentId INT PRIMARY KEY,
    employeeId INT,
    projectId INT,
    roleInProject VARCHAR(50),
    FOREIGN KEY (employeeId) REFERENCES Employees(employeeId),
    FOREIGN KEY (projectId) REFERENCES Projects(projectId)
);


-- Insert data into Departments
INSERT INTO Departments VALUES (1, 'Supply Chain', 'London');
INSERT INTO Departments VALUES (2, 'IT', 'Manchester');
INSERT INTO Departments VALUES (3, 'Finance', 'London');
INSERT INTO Departments VALUES (4, 'Human Resources', 'Birmingham');
INSERT INTO Departments VALUES (5, 'Sales', 'Manchester');

-- Insert data into Employees (50 employees)
INSERT INTO Employees VALUES (1, 'Clark', 'Kent', 2, '2018-05-10', 3200.00, 1, 20, '1990-03-15', 5);
INSERT INTO Employees VALUES (2, 'Dave', 'Davis', 1, '2016-02-01', 4100.00, 0, 25, '1985-07-20', 3);
INSERT INTO Employees VALUES (3, 'Ava', 'Miller', 1, '2020-09-15', 2800.00, 1, 18, '1995-11-05', 2);
INSERT INTO Employees VALUES (4, 'Liam', 'Wilson', 1, '2019-04-12', 3500.00, 1, 22, '1992-01-25', 4);
INSERT INTO Employees VALUES (5, 'Sophia', 'Brown', 2, '2017-07-19', 4600.00, 0, 24, '1987-08-30', 1);
INSERT INTO Employees VALUES (6, 'Noah', 'Jones', 1, '2015-11-03', 5000.00, 1, 30, '1983-12-14', 6);
INSERT INTO Employees VALUES (7, 'Emma', 'Garcia', 2, '2021-01-10', 2700.00, 0, 20, '1998-09-17', 0);
INSERT INTO Employees VALUES (8, 'Mason', 'Rodriguez', 1, '2019-09-01', 3400.00, 1, 18, '1991-04-23', 3);
INSERT INTO Employees VALUES (9, 'Olivia', 'Martinez', 3, '2018-06-25', 3800.00, 1, 21, '1990-06-11', 5);
INSERT INTO Employees VALUES (10, 'Ethan', 'Hernandez', 1, '2016-08-30', 4200.00, 0, 26, '1986-10-29', 4);
INSERT INTO Employees VALUES (11, 'Isabella', 'Lopez', 1, '2020-07-12', 3100.00, 1, 19, '1993-11-19', 2);
INSERT INTO Employees VALUES (12, 'James', 'Gonzalez', 1, '2015-02-15', 4800.00, 1, 28, '1984-05-04', 7);
INSERT INTO Employees VALUES (13, 'Mia', 'Perez', 5, '2019-05-22', 3300.00, 0, 20, '1996-07-07', 2);
INSERT INTO Employees VALUES (14, 'Lucas', 'Sanchez', 1, '2017-10-01', 3900.00, 1, 23, '1989-02-28', 5);
INSERT INTO Employees VALUES (15, 'Charlotte', 'Rivera', 3, '2018-03-11', 3600.00, 0, 22, '1992-06-21', 1);
INSERT INTO Employees VALUES (16, 'Benjamin', 'Torres', 1, '2021-04-14', 2950.00, 1, 17, '1997-09-02', 0);
INSERT INTO Employees VALUES (17, 'Amelia', 'Ramirez', 1, '2016-09-27', 4400.00, 0, 27, '1985-01-16', 3);
INSERT INTO Employees VALUES (18, 'Elijah', 'Flores', 1, '2019-11-05', 3500.00, 1, 21, '1993-12-12', 2);
INSERT INTO Employees VALUES (19, 'Harper', 'Gomez', 5, '2017-01-18', 4000.00, 1, 23, '1988-04-10', 4);
INSERT INTO Employees VALUES (20, 'William', 'Diaz', 2, '2015-06-29', 5300.00, 0, 30, '1982-08-08', 6);
INSERT INTO Employees VALUES (21, 'Ella', 'Reyes', 1, '2020-05-15', 3100.00, 1, 19, '1995-03-13', 1);
INSERT INTO Employees VALUES (22, 'Henry', 'Cruz', 1, '2019-02-20', 3700.00, 0, 21, '1991-11-30', 2);
INSERT INTO Employees VALUES (23, 'Abigail', 'Ortiz', 1, '2016-12-01', 4500.00, 1, 26, '1987-05-09', 4);
INSERT INTO Employees VALUES (24, 'Alexander', 'Gutierrez', 1, '2017-08-14', 3900.00, 1, 23, '1989-10-22', 3);
INSERT INTO Employees VALUES (25, 'Evelyn', 'Chavez', 4, '2021-03-10', 2800.00, 0, 18, '1998-12-17', 0);
INSERT INTO Employees VALUES (26, 'Daniel', 'Ramos', 2, '2018-06-02', 3600.00, 1, 22, '1990-02-06', 2);
INSERT INTO Employees VALUES (27, 'Sofia', 'Warren', 3, '2015-04-05', 5000.00, 0, 29, '1983-07-18', 7);
INSERT INTO Employees VALUES (28, 'Matthew', 'Mills', 1, '2019-09-23', 3450.00, 1, 20, '1994-01-28', 2);
INSERT INTO Employees VALUES (29, 'Avery', 'Fisher', 1, '2016-11-07', 4100.00, 1, 24, '1988-09-09', 5);
INSERT INTO Employees VALUES (30, 'Joseph', 'Hunt', 1, '2018-01-16', 3800.00, 0, 21, '1992-12-03', 3);
INSERT INTO Employees VALUES (31, 'Scarlett', 'Ford', 5, '2020-04-19', 3100.00, 1, 19, '1996-05-27', 1);
INSERT INTO Employees VALUES (32, 'Samuel', 'Gibson', 1, '2017-07-10', 4300.00, 0, 25, '1989-08-15', 4);
INSERT INTO Employees VALUES (33, 'Victoria', 'Porter', 5, '2019-11-30', 3600.00, 1, 21, '1993-10-04', 2);
INSERT INTO Employees VALUES (34, 'David', 'Hamilton', 1, '2016-05-06', 4700.00, 0, 27, '1985-02-21', 6);
INSERT INTO Employees VALUES (35, 'Madison', 'Wallace', 4, '2018-09-12', 3500.00, 1, 22, '1991-06-16', 3);
INSERT INTO Employees VALUES (36, 'Andrew', 'Woods', 1, '2021-07-25', 2900.00, 0, 18, '1997-09-12', 0);
INSERT INTO Employees VALUES (37, 'Grace', 'Cole', 1, '2017-03-08', 4200.00, 1, 24, '1989-01-01', 5);
INSERT INTO Employees VALUES (38, 'Logan', 'West', 3, '2019-10-02', 3700.00, 0, 21, '1992-11-08', 2);
INSERT INTO Employees VALUES (39, 'Chloe', 'Kennedy', 1, '2015-08-29', 5100.00, 1, 30, '1984-04-14', 6);
INSERT INTO Employees VALUES (40, 'Jackson', 'Allen', 1, '2018-02-18', 3900.00, 1, 23, '1990-07-22', 3);
INSERT INTO Employees VALUES (41, 'Lily', 'Young', 2, '2020-06-05', 3100.00, 0, 19, '1995-12-30', 1);
INSERT INTO Employees VALUES (42, 'Sebastian', 'Scott', 1, '2017-12-12', 4500.00, 1, 26, '1988-02-13', 4);
INSERT INTO Employees VALUES (43, 'Aria', 'Green', 1, '2016-03-24', 4000.00, 0, 25, '1987-09-05', 2);
INSERT INTO Employees VALUES (44, 'Carter', 'Adams', 1, '2019-08-14', 3500.00, 1, 20, '1994-11-29', 3);
INSERT INTO Employees VALUES (45, 'Zoe', 'Baker', 3, '2018-10-09', 3700.00, 0, 22, '1992-08-06', 2);
INSERT INTO Employees VALUES (46, 'Wyatt', 'Nelson', 1, '2015-05-21', 4900.00, 1, 29, '1983-06-25', 7);
INSERT INTO Employees VALUES (47, 'Hannah', 'Hill', 1, '2017-09-17', 3800.00, 1, 23, '1989-12-20', 4);
INSERT INTO Employees VALUES (48, 'Owen', 'Campbell', 2, '2019-01-04', 3400.00, 0, 20, '1993-03-15', 2);
INSERT INTO Employees VALUES (49, 'Ellie', 'Mitchell', 1, '2016-06-28', 4100.00, 1, 24, '1988-09-25', 5);
INSERT INTO Employees VALUES (50, 'Dylan', 'Perez', 1, '2018-12-11', 3600.00, 0, 21, '1991-10-31', 3);

-- Insert data into PerformanceReviews
INSERT INTO PerformanceReviews VALUES (1, 2, '2023-01-15', 3, 'Warning', 'Needs improvement in meeting deadlines.');
INSERT INTO PerformanceReviews VALUES (2, 6, '2023-01-20', 2, 'Probation', 'Serious performance issues.');
INSERT INTO PerformanceReviews VALUES (3, 9, '2023-02-01', 4, 'None', 'Great work, but can be more proactive.');
INSERT INTO PerformanceReviews VALUES (4, 1, '2023-02-05', 5, 'None', 'Exceeds expectations in all areas.');
INSERT INTO PerformanceReviews VALUES (5, 5, '2023-02-10', 4, 'None', 'Strong technical skills.');
INSERT INTO PerformanceReviews VALUES (6, 14, '2023-03-11', 3, 'None', 'Met expectations.');
INSERT INTO PerformanceReviews VALUES (7, 17, '2023-03-15', 2, 'Warning', 'Attendance issues noted.');
INSERT INTO PerformanceReviews VALUES (8, 20, '2023-04-02', 5, 'None', 'Top performer in the department.');
INSERT INTO PerformanceReviews VALUES (9, 23, '2023-04-08', 3, 'None', 'Good team player.');
INSERT INTO PerformanceReviews VALUES (10, 27, '2023-05-14', 2, 'Probation', 'Requires close supervision.');
INSERT INTO PerformanceReviews VALUES (11, 30, '2023-05-20', 3, 'Warning', 'Needs to improve communication skills.');
INSERT INTO PerformanceReviews VALUES (12, 34, '2023-06-01', 2, 'None', 'Struggling with new responsibilities.');
INSERT INTO PerformanceReviews VALUES (13, 39, '2023-06-10', 5, 'None', 'Excellent leadership potential.');
INSERT INTO PerformanceReviews VALUES (14, 42, '2023-07-07', 3, 'Warning', 'Inconsistent performance.');
INSERT INTO PerformanceReviews VALUES (15, 45, '2023-07-15', 3, 'Probation', 'Failed to meet project goals.');
INSERT INTO PerformanceReviews VALUES (16, 49, '2023-08-01', 4, 'None', 'Consistently good performer.');
INSERT INTO PerformanceReviews VALUES (17, 3, '2023-08-05', 4, 'None', 'Very reliable.');
INSERT INTO PerformanceReviews VALUES (18, 4, '2023-08-10', 5, 'None', 'Excellent problem-solver.');
INSERT INTO PerformanceReviews VALUES (19, 10, '2023-09-01', 4, 'None', 'Solid performance.');
INSERT INTO PerformanceReviews VALUES (20, 12, '2023-09-05', 5, 'None', 'Instrumental to team success.');

-- Insert data into Projects
INSERT INTO Projects VALUES (101, 'Q1 Logistics Optimization', '2023-01-01', '2023-03-31', 50000.00);
INSERT INTO Projects VALUES (102, 'New ERP System Rollout', '2023-02-15', '2023-08-15', 250000.00);
INSERT INTO Projects VALUES (103, 'Annual Financial Audit', '2023-03-01', '2023-04-30', 75000.00);
INSERT INTO Projects VALUES (104, 'Warehouse Automation Study', '2023-04-10', '2023-06-30', 120000.00);
INSERT INTO Projects VALUES (105, 'Sales Strategy Revamp', '2023-05-01', '2023-07-31', 95000.00);

-- Insert data into ProjectAssignments
-- Project 101
INSERT INTO ProjectAssignments VALUES (1, 2, 101, 'Logistics Lead');
INSERT INTO ProjectAssignments VALUES (2, 4, 101, 'Data Analyst');
INSERT INTO ProjectAssignments VALUES (3, 6, 101, 'Senior Analyst');
INSERT INTO ProjectAssignments VALUES (4, 10, 101, 'Analyst');
-- Project 102
INSERT INTO ProjectAssignments VALUES (5, 1, 102, 'IT Support');
INSERT INTO ProjectAssignments VALUES (6, 5, 102, 'Project Manager');
INSERT INTO ProjectAssignments VALUES (7, 7, 102, 'Developer');
INSERT INTO ProjectAssignments VALUES (8, 20, 102, 'Lead Developer');
-- Project 103
INSERT INTO ProjectAssignments VALUES (9, 9, 103, 'Auditor');
INSERT INTO ProjectAssignments VALUES (10, 15, 103, 'Financial Analyst');
INSERT INTO ProjectAssignments VALUES (11, 27, 103, 'Senior Auditor');
-- Project 104
INSERT INTO ProjectAssignments VALUES (12, 12, 104, 'Project Lead');
INSERT INTO ProjectAssignments VALUES (13, 14, 104, 'Supply Chain Specialist');
INSERT INTO ProjectAssignments VALUES (14, 23, 104, 'Operations Analyst');
INSERT INTO ProjectAssignments VALUES (15, 34, 104, 'Consultant');
-- Project 105
INSERT INTO ProjectAssignments VALUES (16, 13, 105, 'Sales Analyst');
INSERT INTO ProjectAssignments VALUES (17, 19, 105, 'Market Researcher');
INSERT INTO ProjectAssignments VALUES (18, 31, 105, 'Sales Representative');
INSERT INTO ProjectAssignments VALUES (19, 33, 105, 'Data Analyst');
-- Assigning some employees to multiple projects
INSERT INTO ProjectAssignments VALUES (20, 4, 104, 'Data Analyst');
`;
