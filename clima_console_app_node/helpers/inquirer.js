const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'what do you want?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Find a City`
            },
            {
                value: 2,
                name: `${ '2.'.green } History`
            },
            {
                value: 0,
                name: `${ '0.'.green } leave`
            },
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Select an option'.white );
    console.log('==========================\n'.green);
    const { opcion } = await inquirer.prompt(questions);
    return opcion;
}

const pause = async() => {    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${ 'enter'.green } to continue`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listPlaces = async( places = [] ) => {
    const choices = places.map( (place, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: place.id,
            name:  `${ idx } ${ place.name }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a place:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}   

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirm
}
