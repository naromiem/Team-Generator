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

managerFunction();

function managerFunction(){
    console.log("Let's build an engineering team!")


    inquirer
     .prompt([
        {
            type:'input',
            name: 'name',
            message: `What is the managers first and last name?`,

        },
        {
            type:'input',
            name: 'id',
            message: `What is their ID?`,

        },
        {
            type:'input',
            name: 'email',
            message: `What is their email?`,

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
        console.log("Manager added to the team.\n Now will add engineer's");
        engineerFunction();

    });
}


const engineerFunction = () => {
    inquirer
     .prompt([
        {
            type:'input',
            name: 'name',
            message: `Whats is the engineer's first amd last name?`,

        },
        {
            type:'input',
            name: 'id',
            message: `What is their ID?`,

        },
        {
            type:'input',
            name: 'email',
            message: `What is their work email address?`,

        },
        {
            type:'input',
            name: 'username',
            message: `What is their github username?`,
        },
        {
            type:'list',
            name: 'newEmployee',
            message: `Do you want to add more engineers?`,
            choices: ["yes", "no"],
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
        const add = response.newEmployee;
        switch(add){
            case "yes":
                engineerFunction();
                break
            case "no":
                internFunction();
                break
        }
    });
};
const internFunction = () => {
    inquirer
     .prompt([
        {
            type:'input',
            name: 'name',
            message: `What is intern's first and last name?`,

        },
        {
            type:'input',
            name: 'id',
            message: `What is their ID number?`,

        },
        {
            type:'input',
            name: 'email',
            message: `Add their work email?`,

        },
        {
            type:'input',
            name: 'school',
            message: `What school did they attend?`,

        },
        {
            type:'list',
            name: 'newIntern',
            message: `Do you want to add more Interns?`,
            choices: ["yes", "no"], 
        }

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
        const add = response.newIntern
        switch(add){ 
            case "yes":
                internFunction();
                break
            case "no":
                execute();
                break
        }

    });



    

};
const execute = () => {
    const responseContainer = render(team)
    fs.writeFile(outputPath,responseContainer,"utf8",(err)=>
        err ? console.log(err): console.log("success")
    )
}


