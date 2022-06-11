require('dotenv').config()

const { readInput, inquirerMenu, pause, listPlaces } = require('./helpers/inquirer');
const Search = require('./models/searches');

const main = async() => {

    const searches = new Search();
    let opt;

    do{
        opt = await inquirerMenu();        
        switch( opt ) {
            case 1:
                // Show msg
                const term = await readInput('City: ');                
                // search places
                const places = await searches.city( term );                
                // select a place
                const id = await listPlaces(places);
                if ( id === '0' ) continue;
                const placeSelected = places.find( l => l.id === id );
                // save on DB
                searches.addHistory( placeSelected.name );
                // weather
                const clima = await searches.weatherPlace( placeSelected.lat, placeSelected.lng );
                // show result
                console.clear();
                console.log('\nCity info (weather)\n'.green);
                console.log('City:', placeSelected.name.green );
                console.log('Lat:', placeSelected.lat );
                console.log('Lng:', placeSelected.lng );
                console.log('Temp.:', clima.temp );
                console.log('Min:', clima.min );
                console.log('Max:', clima.max );
                console.log('what about the weather?:',  clima.desc.green );
            break;
            case 2:
                 searches.historyCapitalized.forEach( (place, i) =>  {
                     const idx = `${ i + 1 }.`.green;
                     console.log( `${ idx } ${ place } ` );
                 })
            break;
        }

        if ( opt !== 0 ) await pause();

    } while ( opt !== 0 )
}

main();