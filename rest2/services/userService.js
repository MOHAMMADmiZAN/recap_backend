const {faker} = require("@faker-js/faker");


function generatePerson(selectedProps) {
    const personData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        age: faker.number.int({ min: 18, max: 100 }),
    };

    const person = {};

    selectedProps.forEach((prop) => {
        if (personData.hasOwnProperty(prop)) {
            Object.assign(person, { [prop]: personData[prop] });
        } else {
            throw new Error(`Invalid property: ${prop}`);
        }
    });

    return person;
}

module.exports = generatePerson;