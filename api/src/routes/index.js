const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js')
const { Sequelize } = require('sequelize');
const { API_KEY } = process.env;

const router = Router();

function getBreeds() {
    let breedsAPI = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(async function (response) {
            var breeds = response.data.map(breed => (
                {
                    id: breed.id,
                    name: breed.name.toLowerCase(),
                    weight: breed.weight.metric.replace('NaN - ', '').replace('NaN', '26'),
                    height: breed.height.metric,
                    life_span: breed.life_span,
                    image: breed.image.url,
                    temperament: breed.temperament,
                    origin: "api"
                }))
            const breedsFromDb = (await Dog.findAll({ include: "temperaments" })).map(breed => (
                {
                    id: breed.id,
                    name: breed.name,
                    weight: breed.weight,
                    height: breed.height,
                    life_span: breed.life_span,
                    image: breed.image,
                    temperament: breed.temperaments ?
                        (([tempss] = breed.temperaments).map(e => e.name)).join(', ')
                        : "",
                    origin: breed.origin
                }))
            return allBreeds = breeds.concat(breedsFromDb).sort((a, b) => a.name.localeCompare(b.name))
        })
    return breedsAPI
}

router.get('/dogs', function (req, res) {

    getBreeds()
        .then(() => {
            if (req.query.hasOwnProperty('name')) {
                let { name } = req.query

                let found = false
                let breedsWithName = []
                for (let i = 0; i < allBreeds.length; i++) {
                    if (allBreeds[i].name.includes(name)) {
                        breedsWithName.push(allBreeds[i])
                        found = true
                    }
                }
                if (found) {
                    res.status(200).send(breedsWithName)

                }
                else {
                    res.status(404).send('<h1>ERROR: breed not found. Try again!</h1>')
                }
            }
            else {
                res.json(allBreeds)
            }
        })
        .catch((e) => {
            console.log(e)
        })
})

router.get('/dogs/:idRaza', function (req, res) {
    let { idRaza } = req.params;
    getBreeds()
        .then(() => {
            for (let j = 0; j < allBreeds.length; j++) {
                if (allBreeds[j].id == idRaza) { return res.json(allBreeds[j]) }
            }
            return res.status(404).send('<h1>ERROR: breed not found. Try again!</h1>')
        })
})

router.get('/temperament', async function (req, res) {
    let temps = await Temperament.findAll()

    if (temps.length > 0) {
        res.json(temps)
    } else {
        res.status(404).send("Error getting temperaments")
    }
})

router.post('/dog', async function (req, res) {
    let { name, height, weight, lifeSpan, temps, image } = req.body
    var arrTemps = []
    if (!name || !height || !weight) return res.status(404).send('Error. Some required elements are missing')
    for (let i = 0; i < temps.length; i++) {
        let tempSearched = await Temperament.findOne({ where: { name: temps[i] } });
        if (tempSearched !== null) {
            arrTemps.push(tempSearched.dataValues.id)
        }
    }
    try {

        const dog = await Dog.create({
            name,
            weight,
            height,
            life_span: `${lifeSpan} years`,
            image,
            origin: "db"
        });
        arrTemps.forEach(async (temp) => (await dog.addTemperaments(temp)))

        res.json(dog)
    }
    catch (e) {
        console.log(e)
        res.status(404).send('An error has ocurred', e)
    }
})

router.delete('/dogs/:idRaza', async (req, res, next) => {
    const { idRaza } = req.params;
    try {
        await Dog.destroy({
            where: {
                id: idRaza,
            },
        })
        res.send('Dog eliminated')
    } catch (e){
        next(e)
    }
})

//Promise
// function getData() {
//     return new Promise((resolve, reject) => {
//         if (data.length === 0) {
//             reject(new Error('Data is empty'))
//         }
//         setTimeout(() => {
//             resolve(data);
//         }, 2000)
//     })
// }

// getData()
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err.message))

//Async await 
//async function fetchingData(){
// const data = await getData();
// console.log(data);
//} Async await reemplaza el then y el catch

module.exports = router;
