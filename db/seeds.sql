INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Production'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Engineer', 100000.00, 1),
    ('Hand', 50000.00, 2),
    ('Intern', 10000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Andrew', 'Wales', 1, 1),
    ('John', 'Doe', 2, 2),
    ('Case', 'Joe', 3, 3);
