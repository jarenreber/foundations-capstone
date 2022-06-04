const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl:{
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS trails;

        CREATE TABLE trails(
            trail_id SERIAL PRIMARY KEY,
            trail_id_api INTEGER,
            trail_name VARCHAR NOT NULL,
            trail_img VARCHAR,
            trail_length VARCHAR,
            trail_description VARCHAR,
            trail_directions VARCHAR,
            trail_city VARCHAR,
            trail_region VARCHAR,
            trail_country VARCHAR,
            trail_latitude VARCHAR,
            trail_longitude VARCHAR,
            trail_difficulty VARCHAR
        );

            INSERT INTO trails (trail_name, trail_img, trail_length, trail_description, trail_directions, trail_city, trail_region, trail_country, trail_latitude, trail_longitude, trail_difficulty)
            VALUES (
            'Airport Hill', 
            'https://www.utahmountainbiking.com/trails/images/pics-trails/StG-Airport02.jpg',
            '4.3',
            'A semi-technical trail that has a mix of sand, rock, and smooth riding.',
            'On the back side of the airport take Banded Hills Dr. and make your way almost to the airport where there is a dirt parking lot on the south side of the road.',
            'Washington',
            'Utah',
            'United States',
            '37.04160515785115',
            '-113.51954894577864',
            'intermediate');
        
    
        `).then(() => {
            console.log('DB Seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}


//code to add for future use
// CREATE TABLE connection (
//     connection_id SERIAL PRIMARY KEY,
//     user_id VARCHAR(50) FOREIGN KEY NOT NULL REFERENCES users(user_id),
//     trail_id VARCHAR(50) FOREIGN KEY NOT NULL REFERENCES trails(trail_id),
//     user_notes VARCHAR(1000)
// );

// CREATE TABLE users (
//     user_id SERIAL PRIMARY KEY,
//     user_email VARCHAR(50) NOT NULL,
//     user_first VARCHAR(50) NOT NULL,
//     user_last  VARCHAR(50) NOT NULL
// );

// DROP TABLE IF EXISTS users;
// DROP TABLE IF EXISTS connection;
