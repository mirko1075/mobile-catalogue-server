const Pool = require('pg').Pool
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
   //Commented for dev env
    /* ssl: {
        rejectUnauthorized: false,
    }, */
});
const getPhones = (request, response) => {
    pool.query('SELECT * FROM phones ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getPhoneById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM phones WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createPhone = (request, response) => {
    const {phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram } = request.body
  
    pool.query('INSERT INTO phones (phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
     [phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram], (error, result) => {
      if (error) {
        throw error
      }
      console.log('result :>> ', result);
      response.status(201).send(`Phone added added with ID: ${result.rows[0].id}`)
    })
  }

  const updatePhone = (request, response) => {
    const id = parseInt(request.params.id)
    const {phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram } = request.body
  
    pool.query(
      'UPDATE phones SET phone_name = $1, manufacturer=$2, description=$3, color=$4,  price=$5, image_file_name=$6, screen=$7, processor=$8, ram=$9 WHERE id = $10',
      [phone_name,manufacturer,description,color,price,image_file_name,screen,processor,ram, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deletePhone = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM phones WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Phone deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getPhones,
    getPhoneById,
    createPhone,
    updatePhone,
    deletePhone,
  }