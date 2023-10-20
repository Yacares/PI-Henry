const { Router } = require('express');
const morgan = require('morgan');
const axios = require('axios');
const { Dog, Temperament } = require("../db")
const { breedDetail } = require("../variables/breedDetail");
const { v4: uuidv4 } = require('uuid');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(morgan("dev"))

router.get("/dogs", async (req, res) => {
  const { name } = req.query;

  try {
    const dogsFromDatabase = await Dog.findAll();

    const apiKey = process.env.API_KEY;

    const response = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);

    const dogsFromApi = await response.json();

    const transformedData = dogsFromApi.map(breedDetail)

    const allDogs = dogsFromDatabase.concat(transformedData);

    if (!name) {
      return res.status(200).json(allDogs);
    } else {
      const nameLowerCase = name.toLowerCase();
      const matchingDogs = allDogs.filter((dog) => {
        const dogName = dog.name.toLowerCase();
        return dogName.includes(nameLowerCase);
      });

      if (matchingDogs.length === 0) {
        // Si no se encontraron coincidencias, devolver un mensaje adecuado.
        return res.status(404).json({ message: 'No se encontraron razas de perros con el nombre especificado.' });
      } else {
        return res.status(200).json(matchingDogs);
      }
    }
  } catch (error) {
    console.error('Error al obtener las razas de perros:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener las razas de perros' });
  }
});


router.get('/dogs/:idRaza', async (req, res) => {
  const {idRaza} = req.params

  try {
    const validUUID = uuidv4(idRaza); // Convierte y valida el UUID
  
    // Intenta buscar el perro en la base de datos usando el UUID.
    const dogFromDatabase = await Dog.findOne({
      where: {
        id: validUUID,
      },
      include: [
        {
          model: Temperament,
          attributes: ['name'],
          through: { attributes: [] }, // Para excluir atributos adicionales de la relación muchos a muchos.
        },
      ],
    });
  
    if (dogFromDatabase) {
      // Si se encuentra en la base de datos, devolver los datos.
      const { name, Temperaments } = dogFromDatabase;
      const temperaments = Temperaments.map((temperament) => temperament.name);
      res.status(200).json({ name, temperaments });
    } else {
      // Si no se encuentra en la base de datos, busca en la API.
      const apiKey = process.env.API_KEY;
      const apiURL = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

      // Realiza una solicitud a la API para buscar por el ID.
      const response = await axios.get(apiURL);
      const dogFromApi = response.data.find((dog) => dog.id.toString() === idRaza);

      if (dogFromApi) {
        res.status(200).json(breedDetail(dogFromApi));
      } else {
        res.status(404).json({ message: 'Perro no encontrado' });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.get('/temperaments', async (req, res) => {
  try {
    // Realiza una solicitud a la API para obtener los temperamentos
    const apiKey = process.env.API_KEY;
    const apiURL = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;
    const response = await axios.get(apiURL);
    const temperamentsFromApi = response.data;

    // Guarda los temperamentos en la base de datos
    await Promise.all(
      temperamentsFromApi.map(async (element) => {
        if (element.temperament) {
          const temperamentList = element.temperament.split(",");

          await Promise.all(
            temperamentList.map(async (temp) => {
              await Temperament.findOrCreate({
                where: { name: temp.trim() },
              });
            })
          );
        }
      })
    );

    // Obtiene los temperamentos de la base de datos
    const allTemperaments = await Temperament.findAll();

    res.status(200).json(allTemperaments);
  } catch (error) {
    console.error('Error al obtener los temperamentos:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los temperamentos' });
  }
});

router.post('/dogs', async (req, res) => {
  try {
    const { name, height, weight, lifespan, temperament } = req.body;

    // Verificar si ya existe un perro con el mismo nombre
    const existingDog = await Dog.findOne({ where: { name } });

    if (existingDog) {
      return res.status(400).json({ error: 'Ya existe un perro con este nombre.' });
    }

    // Crear un nuevo perro
    const newDog = await Dog.create({
      name,
      height,
      weight,
      lifespan,
    });

    // Agregar temperamentos al perro
    
    for (const temperamentId of temperament) {
      const temperament = await Temperament.findByPk(temperamentId);
      if (temperament) {
        await newDog.addTemperament(temperament);
      } else {
        return res.status(400).json({ error: 'Temperamento no encontrado.' });
      }
      
    }

    res.status(201).json(newDog);
  
  } catch (error) {
    console.error('Error al crear un perro:', error);
    res.status(500).json({ error: 'Hubo un problema al crear un perro' });
  }
});


module.exports = router;