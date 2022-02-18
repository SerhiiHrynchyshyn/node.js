const fs = require('fs');
const path = require("path");

const onlineUsers = [{name: "Serhii", age: 23, city: "Lviv"}];
const inPersonUsers = [{name: "Nataliya", age: 27, city: "Lviv"}];

fs.mkdir(path.join(__dirname, 'main'), {recursive: true}, err => {
    if (err) {
        console.log(err);
        throw err
    }
})

fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, err => {
    if (err) {
        console.log(err);
        throw err
    }
})
fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true}, err => {
    if (err) {
        console.log(err);
        throw err;
    }
})

for (const user of inPersonUsers) {
    for (const key in user) {
        fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'),
            `${key} : ${user[key]}\n`, {flag: 'a'}, err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })
    }
}

for (const user of onlineUsers) {
    for (const key in user) {
        fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'),
            `${key} : ${user[key]}\n`, {flag: 'a'}, err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })
    }
}

const replaceUsers = (way, file, arr) => {
    fs.truncate(path.join(__dirname, 'main', way, file),
        (err) => {
            if (err) {
                console.log(err);
            }
        })

    arr.map(user => {
        fs.appendFile(path.join(__dirname, 'main', way, file),
            `\n name: ${user.name}; \n age: ${user.age}; \n city: ${user.city}`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            })
    })
}


replaceUsers('online', 'online.txt', onlineUsers)
replaceUsers('inPerson', 'inPerson.txt', inPersonUsers)