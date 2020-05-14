const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeTeam = [];

//Employee questions: manager, engineer, intern & more questions 
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?:"
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?:"
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?:"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number:"
    }
]
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?:"
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's id?:"
    },
    {
        type: "input",
        name: "email",
        message: "What is your engineer's email?:"
    },
    {
        type: "input",
        name: "github",
        message: "What is your engineer's GitHub username?:"
    }
]
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your intern's name?:"
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's id?:"
    },
    {
        type: "input",
        name: "email",
        message: "What is your intern's email?:"
    },
    {
        type: "input",
        name: "school",
        message: "What is your  intern's school?:"
    }
]
const moreEmployeeQuestions = [
    {
        type: "list",
        name: "options",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add anymore members"
        ]
    }
]
//Creation of new employees 
async function promptMoreUser() {
    try {
        const answers = await inquirer.prompt(moreEmployeeQuestions);
        if (answers.options === "Engineer") {
            createEngineer();
        } else if (answers.options === "Intern") {
            createIntern();
        } else {
            //call render, pass array of all emp.
            const teamString = render(employeeTeam);
            console.log(teamString);
            //take string from render to write file 
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function createEngineer() {
    try {
        const answers = await inquirer.prompt(engineerQuestions);
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        //push new employy to global array 
        employeeTeam.push(engineer);
        //call promptMoreUser func
        promptMoreUser();
    }
    catch (err) {
        console.log(err);
    }
}

async function createIntern() {
    try {
        const answers = await inquirer.prompt(internQuestions);
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employeeTeam.push(intern);
        promptMoreUser();
    }
    catch (err) {
        console.log(err);
    }
}

//init function
async function init() {
    try {
        const answers = await inquirer.prompt(managerQuestions);
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employeeTeam.push(manager);
        promptMoreUser();
        // console.log(manager);
    }

    catch (err) {
        console.log(err);
    }

}
//Initializing here 
init();