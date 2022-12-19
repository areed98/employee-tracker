-- remove tables if they exist
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- create tables
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT REFERENCES employees(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);