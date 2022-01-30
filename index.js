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
    const sql = `DESCRIBE department`;

    db.query(sql, (err, rows) => {
        if (err) {
            // console.log(err);
            return;
        }
        console.log(rows)
    });
};

const promptDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: ''
        }
    ])
}

db.connect(err => {
    if (err) throw err;
    console.log('Database connected')
    promptUser();
})



