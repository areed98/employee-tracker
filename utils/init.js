// Dependencies
const db = require("../db/connect");
const inquirer = require("inquirer");

require("console.table");

function init() {
    console.log("");
    console.table(`
    ======================
    |                    |
    |  Employee Manager  |
    |                    |
    ======================
    `);
    setTimeout(() => {
        menu();
    }, 1000);
}

function menu() {
    console.log("");
    inquirer
        .prompt({
            type: "list",
            name: "main",
            message: "Please select an option.",
            choices: [
                "View Departments",
                "View Roles",
                "List Employees",
                "List Employees by Department",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee",
                "Exit",
            ],
        })
        .then(({ main }) => {
            if (main === "View Departments") {
                viewDept();
            } else if (main === "View Roles") {
                viewRole();
            } else if (main === "List Employees") {
                viewEmp();
            } else if (main === "List Employees by Department") {
                listEmp();
            } else if (main === "Add Department") {
                addDept();
            } else if (main === "Add Role") {
                addRole();
            } else if (main === "Add Employee") {
                addEmp();
            } else if (main === "Update Employee") {
                updateEmp();
            } else if (main === "Exit") {
                endFunct();
            }
        });
}

// View Departments
function viewDept() {
    const sql = `SELECT id AS id, name AS name FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log("");
        console.table(rows);
        setTimeout(() => {
            menu();
        }, 1000);
    });
}

// View Roles
function viewRole() {
    const sql = `SELECT role.id AS id, title AS title, name AS name, salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log("");
        console.table(rows);
        setTimeout(() => {
            menu();
        }, 1000);
    });
}

// View Employees
function viewEmp() {
    const sql = `SELECT e.id AS id, concat(e.first_name,' ', e.last_name) AS employee, e.title AS title, e.salary AS salary, e.department.name as department, CASE WHEN e.manager_id = e.id THEN concat('N/A') ELSE concat(m.first_name, ' ', m.last_name) END AS manager FROM (SELECT * FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id) AS e, employees m WHERE m.id = e.manager_id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log("");
        console.table(rows);
        setTimeout(() => {
            menu();
        }, 1000);
    });
}

// View Employees by Department
function listEmp() {
    const getDepartments = new Promise((resolve, reject) => {
        var departmentsArray = [];
        db.query(sql, (err, rows) => {
            if (err) {
              console.log(err.message);
            }
            // ROLE FOR LOOP
            for (var i = 0; i < rows.length; i++) {
              departmentsArray.push(Object.values(rows[i])[0]);
            }
            resolve(departmentsArray);
          });
        });
        getDepartments.then((departmentsArray) => {
            inquirer
            .prompt([
                {
                    type: "list",
                    name: "deptID",
                    message: "Choose department to display employees.",
                    choices: departmentsArray,
                    filter: (deptIDInput) => {
                        if (deptIDInput) {
                            return departmentsArray.indexOf(deptIDInput);
                        }
                    },
                },
            ])
            .then(({ deptID }) => {
                const sql = `SELECT e.id AS id, concat(e.first_name,' ',e.last_name) AS employee, e.title AS title, e.salary AS salary, e.name AS department,
                CASE WHEN e.manager_id = e.id THEN concat('N/A') ELSE concat(m.first_name,' ',m.last_name) END AS manager FROM
                (SELECT * FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN dept ON role.department_id = department.id) AS e, employees m
                WHERE m.id = e.manager_id AND id = ? `;
                const query = [deptID + 1];
                db.query(sql, query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }
                    console.table(rows);
                    menu();
                });
            });
        });
}

function endFunct() {
    console.log("");
    console.log("Thanks for checking in!");
    setTimeout(() => {
        console.log("");
    }, 1000);
    setTimeout(() => {
        process.exit(1);
    }, 1000);
}

module.exports = init;