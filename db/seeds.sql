INSERT INTO department (department_id)

VALUES
("Engineering"),
("Sales"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
("Salesperson", 75000, 2),
("Sales Lead", 110000, 2),
("Accountant", 100000, 3),
("Account Manager", 120000, 3),
("Backend/Lead Developer", 130000, 1),
("Frontend Developer", 125000, 1),
("Lawyer", 140000, 4),
("Legal Manager", 160000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Jack", "Jack", 1, 2),
("Jill", "Jack", 2, null),
("Morgan", "Brown", 3, 4),
("Kevin", "White", 4, null),
("Austin", "Brady", 5, null),
("Jake", "Rake", 6, 5),
("Kaleb", "Thomas", 7, 8),
("John", "Zahn", 8, null);
