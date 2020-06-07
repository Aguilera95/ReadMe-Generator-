var inquirer = require("inquirer");
var api = require("./utils/api");
var genMarkDown = require ("./utils/generateMarkdown");
var fs = require("fs");
var path = require("path");

const questions = [ 
    {
        type: "input",
        name: "GitHub",
        message: "What is the name of your Git Hub?"
      },

      {
        type: "input",
        name: "Description",
        message: "What is the description of your project?"
      },

      {
        type: "input",
        name: "Installation",
        message: "What command is run to install dependencies?"
      },

      {
        type: "input",
        name: "Usage",
        message: "What does your user need to know about your repo?"
      },

      {
        type: "list",
        name: "License",
        message: "What kind of license does your project have?" 
        , choices:["MIT", "APACHE 2.0", "BSD 3", "None"]
      },
      {
        type: "input",
        name: "Contributing",
        message: "What does your user need to know about contributing to your repo?"
      },
      {
        type: "input",
        name: "Tests",
        message: "What commands should we run to run tests?"
      },

];

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {inquirer.prompt(questions)
    .then((responses) => {
        // Run Get User Function (Given Answer to Prompt) on API
        api.getUser(responses.GitHub)

        .then(({data}) => {

            writeToFile("README.md", genMarkDown({...responses, ...data}));
        });  
    });


}

init();
