require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    saveTrail: (req, res) => {
        const {trail_name, trail_length, trail_description, trail_directions, trail_city, trail_region, trail_country, trail_latitude, trail_longitude, trail_difficulty, trail_img  } = req.body

        sequelize.query(`
            INSERT INTO trails (trail_name, trail_img, trail_length, trail_description, trail_directions, trail_city, trail_region, trail_country, trail_latitude, trail_longitude, trail_difficulty)
            VALUES ('${trail_name}', '${trail_img}', '${trail_length}', '${trail_description}', '${trail_directions}', '${trail_city}', '${trail_region}', '${trail_country}', '${trail_latitude}', '${trail_longitude}', '${trail_difficulty}');
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error on saveTrail', err))
    },
    getTrails: (req, res) => {
        sequelize.query(`
            SELECT * FROM trails;
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error on get trails', err))
    },
    deleteTrail: (req, res) => {
        const { id } = req.params
        sequelize.query(`
            DELETE
            FROM trails
            WHERE trail_id = ${id};
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error on delete trail', err))
    },
    saveTrailApi: (req, res) => {
        let { id, name, thumbnail, length, description, directions, city, region, country, lat, lon, difficulty} = req.body

        directions = directions.replace("'", "")
        description = description.replace("'", "")
        sequelize.query(`
            INSERT INTO trails (trail_id_api, trail_name, trail_img, trail_length, trail_description, trail_directions, trail_city, trail_region, trail_country, trail_latitude, trail_longitude, trail_difficulty)
            VALUES (${id}, '${name}', '${thumbnail}', '${length}', '${description}', '${directions}', '${city}', '${region}', '${country}', '${lat}', '${lon}', '${difficulty}');
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
    }
}