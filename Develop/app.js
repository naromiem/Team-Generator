const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const team =[];

runEmplist();

function runEmplist(){


    inquirer
    .prompt([
        {
            type:'list',
            name: 'title',
            message: `Whats your position?`,
            choices: ["Manager", "Engineer", "Intern"],
        },
    ])
    .then((response) => {
        console.log (response);
        let position = response.title;

        switch(position) {
            case "Manager":
                managerFunction();
                break
            case "Engineer":
                engineerFunction();
                break
            case "Intern":
                internFunction();
                break
        }
       
    });
}



const managerFunction = () => {
    inquirer
     .prompt([
        {
            type:'input',
            name: 'name',
            message: `Whats the manager's name?`,

        },
        {
            type:'input',
            name: 'id',
            message: `Whats their ID?`,

        },
        {
            type:'input',
            name: 'email',
            message: `Whats their email?`,

        },
        {
            type:'input',
            name: 'position',
            message: `Whats their office number?`,
        },
    ])
    .then((response) => {
        console.log (response) 
        
        const manager = new Manager(
            response.name, 
            response.id,
            response.email,
            response.position,
        );
        team.push(manager);
        execute();

    });

    

};
const engineerFunction = () => {
    inquirer
     .prompt([
        {
            type:'input',
            name: 'name',
            message: `Whats the engineer's name?`,

        },
        {
            type:'input',
            name: 'id',
            message: `Whats their ID?`,

        },
        {
            type:'input',
            name: 'email',
            message: `Whats their email?`,

        },
        {
            type:'input',
            name: 'username',
            message: `Whats their github username?`,
        },
    ])
    .then((response) => {
        console.log (response) 
        
        const engineer = new Engineer(
            response.name, 
            response.id,
            response.email,
            response.username,
        );
        team.push(engineer);
        execute();

    });

    

};
const internFunction = () => {
    inquirer
     .prompt([
        {
            type:'input',
            name: 'name',
            message: `Whats the intern's name?`,

        },
        {
            type:'input',
            name: 'id',
            message: `Whats their ID?`,

        },
        {
            type:'input',
            name: 'email',
            message: `Whats their email?`,

        },
        {
            type:'input',
            name: 'school',
            message: `What school did they attend?`,
        },
    ])
    .then((response) => {
        console.log (response) 
        
        const intern = new Intern(
            response.name, 
            response.id,
            response.email,
            response.school,
        );
        team.push(intern);
        execute();

    });

    

};
const execute = () => {
    const responseContainer = render(team)
    fs.writeFile(outputPath,responseContainer,"utf8",(err)=>
        err ? console.log(err): console.log("success")
    )
}


