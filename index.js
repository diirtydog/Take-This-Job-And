const inquirer = require('inquirer');
const db = require('./db/connection');


const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: "What's on the agenda for today?",
            name: 'action',
            choices: [
                    'View all Departments', 
                    'View all Roles', 
                    'View all Hands', 
                    'Add a Department', 
                    'Add a Role', 
                    'Add an Employee', 
                    'Update an Employee Role'
                    ]
        }
    ])
    .then(({ action }) => {
        console.log(action)
        switch (action) {
            case 'View all Departments':
                viewDepartments();
            break;
            case 'View all Roles':
                viewRoles();
            break;
            case 'View all Hands':
                viewHands();
            break;
            case 'Add a Department':
                promptDepartment();
            break;
            case 'Add a Role':
                promptRole();
            break;
            case 'Add an Employee':
                promptEmployee();
            break;
            case 'Update an Employee Role':
                updateRole();
            break;

        }
    })
}

const viewDepartments = () => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            // console.log(err);
            return;
        }
        console.table(rows);
        promptUser();
    });
};

const viewRoles = () => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, rows) => {
        if (err) {
            return err;
        }
        console.table(rows);
        promptUser();
    });
};

const viewHands = () => {
    const sql = `SELECT * FROM employee;`;

    db.query(sql, (err, rows) => {
        if (err) {
            return err;
        }
        console.table(rows);
        promptUser();
    });
};

const promptDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then(({ name }) => {
        const sql = `INSERT INTO department (name)
                     VALUES
                        ('${name}')`;
        // console.log(name);
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                return err;
            }
            promptUser();
        });
    });
};

const promptRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please enter the name of the role you would like to add.'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of this role? (Please enter number with two decimal points!)'
        },
        {
            type: 'number',
            name: 'department',
            message: 'Which department id will this role be associated with?'
        }
    ])
    .then(({ roleName, salary, department }) => {
        const sql = `INSERT INTO role (title, salary, department_id)
                     VALUES
                        ('${roleName}', ${salary}, ${department})`;

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                return err;
            }
            promptUser();
        });
    });
};

const promptEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee we are adding today?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee we are adding today?'
        },
        {
            type: 'number',
            name: 'roleId',
            message: 'What is the role id of the employee we are adding today?'
        },
        {
            type: 'number',
            name: 'managerId',
            message: 'What is the managers id that will be in charge of this employee?'
        }
    ])
    .then(({ firstName, lastName, roleId, managerId }) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                     VALUES
                        ('${firstName}', '${lastName}', ${roleId}, ${managerId})`;
        
        db.query (sql, (err, rows) => {
            if (err) {
                console.log(err);
                return err;
            }
            promptUser();
        });
    });
};

const updateRole = () => {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'employeeId',
            message: 'What is the id of the employee you would like to update?'
        },
        {
            type: 'number',
            name: 'newRole',
            message: 'Please enter the updated role id for this employee.'
        }
    ])
    .then(({ employeeId, newRole }) => {
        const sql = `UPDATE employee SET role_id = ${newRole}
                     WHERE id = ${employeeId}`

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                return err;
            }
            promptUser();
        })
    })
}

db.connect(err => {
    if (err) throw err;
    console.log('Database connected')
    promptUser();
})



