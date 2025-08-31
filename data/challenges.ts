
import { Difficulty } from '../types';
import type { Challenge } from '../types';

export const challenges: Challenge[] = [
    // Beginner
    {
        id: 1,
        title: 'Select All Employees',
        description: 'Write a query to retrieve all columns for every record in the Employees table.',
        difficulty: Difficulty.Beginner,
        schemaTables: ['Employees'],
        solution: 'SELECT * FROM Employees;',
    },
    {
        id: 2,
        title: 'Select Specific Columns',
        description: 'List the first name, last name, and monthly salary of all employees.',
        difficulty: Difficulty.Beginner,
        schemaTables: ['Employees'],
        solution: 'SELECT firstName, lastName, monthlySalary FROM Employees;',
    },
    {
        id: 3,
        title: 'Filter by Department',
        description: 'Find all employees who work in the department with departmentId = 1.',
        difficulty: Difficulty.Beginner,
        schemaTables: ['Employees'],
        solution: 'SELECT * FROM Employees WHERE departmentId = 1;',
    },
    {
        id: 4,
        title: 'Order by Salary',
        description: 'Retrieve the first name, last name, and monthly salary for all employees, ordered by salary in descending order.',
        difficulty: Difficulty.Beginner,
        schemaTables: ['Employees'],
        solution: 'SELECT firstName, lastName, monthlySalary FROM Employees ORDER BY monthlySalary DESC;',
    },
    // Intermediate
    {
        id: 5,
        title: 'Employees and Departments',
        description: 'List the first name of each employee and the name of the department they work in. Use a JOIN to combine the Employees and Departments tables.',
        difficulty: Difficulty.Intermediate,
        schemaTables: ['Employees', 'Departments'],
        solution: 'SELECT e.firstName, d.departmentName FROM Employees e JOIN Departments d ON e.departmentId = d.departmentId;',
    },
    {
        id: 6,
        title: 'Count Employees per Department',
        description: 'Write a query to count the number of employees in each department. Show the department name and the employee count.',
        difficulty: Difficulty.Intermediate,
        schemaTables: ['Employees', 'Departments'],
        solution: 'SELECT d.departmentName, COUNT(e.employeeId) AS numberOfEmployees FROM Departments d JOIN Employees e ON d.departmentId = e.departmentId GROUP BY d.departmentName;',
    },
    {
        id: 7,
        title: 'Average Salary by Department',
        description: 'Calculate the average monthly salary for each department. Display the department name and the average salary.',
        difficulty: Difficulty.Intermediate,
        schemaTables: ['Employees', 'Departments'],
        solution: 'SELECT d.departmentName, AVG(e.monthlySalary) as averageSalary FROM Employees e JOIN Departments d ON e.departmentId = d.departmentId GROUP BY d.departmentName;',
    },
    {
        id: 8,
        title: 'High Earners',
        description: 'Find all employees who earn more than 4000 per month and work in the Supply Chain department.',
        difficulty: Difficulty.Intermediate,
        schemaTables: ['Employees', 'Departments'],
        solution: 'SELECT e.firstName, e.lastName, e.monthlySalary, d.departmentName FROM Employees e JOIN Departments d ON e.departmentId = d.departmentId WHERE e.monthlySalary > 4000 AND d.departmentName = "Supply Chain";',
    },
    // Advanced
    {
        id: 9,
        title: 'Departments with High Average Salary',
        description: 'List the names of departments where the average employee salary is greater than 3800.',
        difficulty: Difficulty.Advanced,
        schemaTables: ['Employees', 'Departments'],
        solution: 'SELECT d.departmentName FROM Employees e JOIN Departments d ON e.departmentId = d.departmentId GROUP BY d.departmentName HAVING AVG(e.monthlySalary) > 3800;',
    },
    {
        id: 10,
        title: 'Employees with Performance Reviews',
        description: 'Find all employees who have had a performance review. List their full name, review date, and rating.',
        difficulty: Difficulty.Advanced,
        schemaTables: ['Employees', 'PerformanceReviews'],
        solution: 'SELECT e.firstName, e.lastName, pr.reviewDate, pr.rating FROM Employees e JOIN PerformanceReviews pr ON e.employeeId = pr.employeeId;',
    },
    {
        id: 11,
        title: 'Employees Not on Any Project',
        description: 'Write a query to find all employees who are not currently assigned to any project. Use a LEFT JOIN and check for NULL values.',
        difficulty: Difficulty.Advanced,
        schemaTables: ['Employees', 'ProjectAssignments'],
        solution: 'SELECT e.firstName, e.lastName FROM Employees e LEFT JOIN ProjectAssignments pa ON e.employeeId = pa.employeeId WHERE pa.assignmentId IS NULL;',
    },
    {
        id: 12,
        title: 'Employee with Highest Salary',
        description: 'Find the employee with the highest monthly salary without using ORDER BY and LIMIT 1. Use a subquery.',
        difficulty: Difficulty.Advanced,
        schemaTables: ['Employees'],
        solution: 'SELECT firstName, lastName, monthlySalary FROM Employees WHERE monthlySalary = (SELECT MAX(monthlySalary) FROM Employees);',
    },
    // Expert
    {
        id: 13,
        title: 'Salary Rank by Department',
        description: 'For each department, rank employees by their salary in descending order. Show department name, employee full name, salary, and their rank. This requires a window function.',
        difficulty: Difficulty.Expert,
        schemaTables: ['Employees', 'Departments'],
        solution: `
            SELECT 
                d.departmentName,
                e.firstName,
                e.lastName,
                e.monthlySalary,
                RANK() OVER (PARTITION BY d.departmentName ORDER BY e.monthlySalary DESC) as salaryRank
            FROM Employees e
            JOIN Departments d ON e.departmentId = d.departmentId;
        `,
    },
    {
        id: 14,
        title: 'Projects and Team Size',
        description: 'List all projects along with the number of employees assigned to each one. Include projects that have no employees assigned.',
        difficulty: Difficulty.Expert,
        schemaTables: ['Projects', 'ProjectAssignments'],
        solution: 'SELECT p.projectName, COUNT(pa.employeeId) AS teamSize FROM Projects p LEFT JOIN ProjectAssignments pa ON p.projectId = pa.projectId GROUP BY p.projectName;',
    },
     {
        id: 15,
        title: 'Employees Hired Before Department Average',
        description: 'Find employees who were hired before the average hire date of their respective departments. Display the employee name, their hire date, and their department name.',
        difficulty: Difficulty.Expert,
        schemaTables: ['Employees', 'Departments'],
        solution: `
            WITH DepartmentAvgHireDate AS (
                SELECT
                    departmentId,
                    AVG(julianday(hireDate)) as avgHireDateJd
                FROM Employees
                GROUP BY departmentId
            )
            SELECT 
                e.firstName,
                e.lastName,
                e.hireDate,
                d.departmentName
            FROM Employees e
            JOIN Departments d ON e.departmentId = d.departmentId
            JOIN DepartmentAvgHireDate dahd ON e.departmentId = dahd.departmentId
            WHERE julianday(e.hireDate) < dahd.avgHireDateJd;
        `,
    }
];
