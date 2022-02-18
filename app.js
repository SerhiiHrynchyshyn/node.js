// Завдання на практику

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього
// дані і одразу, дані які ви отримали запишіть їх в інший файл,
// в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

const fs = require('fs');
const path = require('path');

// const oneT = path.join(__dirname, 'one.txt');
// const twoT = path.join(__dirname, 'two.txt');


// fs.writeFile(oneT, 'qwerty, some data, some txt', (err) => {
//     if (err){
//         console.log(err)
//         throw err
//     }
//
//     fs.readFile(oneT, 'utf8', (err, data) => {
//         if (err){
//             console.log(err)
//             throw err
//         }
//
//         fs.writeFile(twoT, data, (err) => {
//             if (err){
//                 console.log(err)
//                 throw err
//             }
//         })
//     })
// })


// -----------
// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх
// в нову папку та файл в ній, старий файл видаліть після того як
// все завершиться. Також вийде callback hell

// const file = path.join(__dirname, 'main');
// const oneT = path.join(__dirname, 'one.txt');
// const twoT = path.join(__dirname, 'main', 'two.txt');
//
// fs.writeFile(oneT, 'hello, some text, some data file', err => {
//     if (err) {
//         console.log(err)
//         throw err
//     }
//     fs.readFile(oneT, 'utf8', (err, data) => {
//         if (err) {
//             console.log(err)
//             throw err
//         }
//         fs.mkdir(file, {recursive: true}, (err) => {
//             if (err) {
//                 console.log(err)
//                 throw err
//             }
//             fs.writeFile(twoT, data, (err) => {
//                 if (err) {
//                     console.log(err)
//                     throw err
//                 }
//                 fs.unlink(oneT, (err) => {
//                     if (err) {
//                         console.log(err);
//                         throw err;
//                     }
//                 });
//             })
//         })
//     })
// })


// 3. Створіть папку (можете вручну) напишіть скріпт який
// створить в ній якись дані (можуть бути нові папки і
// файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і
// перевіряти якщо дані які в ній лежать - це файли
// тоді вам потрібно їх очистити, але не видаляти, якщо дані
// - це папки, вам потрібно їх перейменувати і додати до назви
// префікс _new


// const mainFile = path.join(__dirname, 'main');
// const mainFileTxt1 = path.join(__dirname, 'main', 'mainFile1');
// const mainFileTxt3 = path.join(__dirname, 'main', 'mainFileTxt1.txt');


const mainFile = path.join(__dirname, 'main');
const mainFileTxt1 = path.join(__dirname, 'main', 'mainFile1');
const mainFileTxt3 = path.join(__dirname, 'main', 'mainFileTxt1.txt');

fs.mkdir(mainFile, {recursive: true}, err => {
    if (err) {
        console.log(err)
        throw err
    }

    fs.mkdir(mainFileTxt1, {recursive: true}, err => {
        if (err) {
            console.log(err)
            throw err
        }
        fs.writeFile(mainFileTxt3, 'data1', err => {
            if (err) {
                console.log(err)
                throw err
            }
        })
    })
})


function readerFile(params) {
    fs.readdir(path.join(__dirname, params), (err, info) => {
        if (err) {
            console.log(err);
            throw err;
        }

        info.forEach(file => {
            fs.stat(path.join(params, file), (err, fileInfo) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                if (fileInfo.isFile()) {

                    fs.truncate(path.join(__dirname, params, file), (err) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    })
                } else if (fileInfo.isDirectory()) {
                    fs.rename(path.join(__dirname, params, file),
                        path.join(__dirname, params, file + '_new'), (err) => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        })
                }
            });
        });
    });
}

readerFile('main');