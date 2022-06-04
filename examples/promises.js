const employies = [
    {
        id: 1,
        name: 'Fernando'
    },
    {
        id: 2,
        name: 'Linda'
    },
    {
        id: 3,
        name: 'Karen'
    }
];

const salaries = [
    {
        id: 1,
        salary: 1000
    },
    {
        id: 2,
        salary: 1500
    }
];

const getEmployee = ( id ) => {

    
    return new Promise(( resolve, reject ) => {

        const employee = employies.find( e => e.id === id )?.name;

        ( employee ) 
            ? resolve( employee )
            : reject( `No existe empleado con id ${ id }` );
    });
}

const getSalary = () => {
    return new Promise(( resolve, reject ) => {

        const salary = salaries.find( s => s.id === id )?.salary;

        ( salary ) 
            ? resolve( salary )
            : reject( `No existe salario con id ${ id }` );
    });
}



const id = 3;

// getEmpleado(id)
//     .then( empleado => console.log( empleado ) )
//     .catch( err => console.log(err) );


// getSalario(id)
//     .then( salario => console.log( salario ) )
//     .catch( err => console.log(err) );

let nombre;

getEmployee(id)
    .then( employee => {
        name = employee;
        return getSalary( id ) 
    })
    .then( salario => console.log( 'El empleado:', name, 'tiene un salario de:', salario ))
    .catch( err => console.log( err ) );

