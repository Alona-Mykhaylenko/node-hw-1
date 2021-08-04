const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const allFunctions = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await allFunctions.listContacts();
        console.table(contacts);
        break;

      case "get":
        const foundContact = await allFunctions.getContactById(Number(id));
        console.log(foundContact);
        break;

      case "add":
        const newContacts = await allFunctions.addContact(name, email, phone);
        console.log(newContacts);
        break;

      case "remove":
        const removedContact = await allFunctions.removeContact(Number(id));
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
};

invokeAction(argv);
