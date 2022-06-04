
// setTimeout( () => {
//     console.log('Hola Mundo');
// } , 1000 );


const getUserById = ( id, callback ) => {

    const user = {
        id,
        name: 'Fernando'
    }

    setTimeout( () => {
        callback(user)
    }, 1500 )

}


getUserById( 10, ( user ) => {
    console.log( user.id );
    console.log( user.name.toUpperCase() );
});
