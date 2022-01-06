const {ConnectionPool} = require("../conf/ConnectionDb");
const {PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_HOST, NODE_ENV} = process.env;
const isProduction = NODE_ENV === "production";
const sslObj = isProduction === true;
const connectionPool = new ConnectionPool(PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_HOST, NODE_ENV, sslObj )
const pool = isProduction? connectionPool.prodPool : connectionPool.devPool
pool.on('error', function(error) {
  console.log('error :>> ', error);
  return;
});

const getPhones = async (request, response) => {
    try {
      await pool.query('SELECT * FROM phones ORDER BY id ASC', (error, result) => {
        if (error) {
          response.send({message:"Error in DB", status: "error", error});
          return;
        }
        if (!result?.rows?.length){
          response.status(404).send({message:"No phones", status: "error", error})     
          return;
        }
        response.status(200).json(result.rows);    
        
      })    
    } catch (error) {
      console.log(`error`, error)
    }
  }

  const getPhone = async (request, response) => {
    const id = parseInt(request.params.id)
    try {
      await pool.query('SELECT * FROM phones WHERE id = $1', [id], (error, result) => {
        if (error) {
          response.send({message:"Error in DB", status: "error", error});
          return;
        }
        if (!result?.rows?.length){
          response.status(404).send({message:"No phone with this id", status: "error", error});
          return;
        }
          response.status(200).json(result.rows);
      })      
    } catch (error) {
      response.status(404).send({message:"Phone not found server error",id, status: "error", error})
    }
  }

  const postPhone = async (request, response) => {
    let {phone_name,manufacturer,description,color,price,screen,processor,ram,B64File } = request.body
    const phone = {phone_name,manufacturer,description,color,price,screen,processor,ram,file:B64File}
    if (!ram) ram=0;
    if (!price) price=0;
    if (phone_name) {
        try {
          await pool.query('INSERT INTO phones (phone_name,manufacturer,description,color,price,screen,processor,ram,file) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
          [phone_name,manufacturer,description,color,price,screen,processor,ram,B64File], (error, result) => {
            if (error) {
              console.log('error :>> ', error);
              response.status(404).send({message: "Error in the DB", status: "error", error });
              return;
            }
              response.status(201).send({message: "Phone successfully added!",id: result.rows[0].id, ...phone });
          })  
        } catch (error) {
          response.status(404).send({message:"Phone not added server error", status: "error", error})
        }
    }else{
      response.status(404).send({message:"Phone name is mandatory field", status: "error"})
    }

  }

  const updatePhone = async (request, response) => {
    const id = parseInt(request.params.id)
    const {phone_name,manufacturer,description,color,price,screen,processor,ram,B64File  } = request.body
    if (phone_name) {
      try {
        if (B64File){
          await pool.query(
            'UPDATE phones SET phone_name = $1, manufacturer=$2, description=$3, color=$4,  price=$5, screen=$6, processor=$7, ram=$8, file=$9 WHERE id = $10 RETURNING id',
            [phone_name,manufacturer,description,color,Number(price),screen,processor,Number(ram),B64File, id],
            (error, results) => {
              if (error) {
                response.status(404).send({message: "Error in the DB", status: "error", error });
                return;
              }
              if (!results.rowCount) {
                response.status(404).send({message: "Phone ID not present", status: "error"});
                return;
              }
              response.status(200).send(`Phone modified with ID: ${id}`)
            }
          )
        }else{
          await pool.query(
            'UPDATE phones SET phone_name = $1, manufacturer=$2, description=$3, color=$4,  price=$5, screen=$6, processor=$7, ram=$8 WHERE id = $9',
            [phone_name,manufacturer,description,color,Number(price),screen,processor,Number(ram), id],
            (error, results) => {
              if (error) {
                response.status(404).send({message: "Error in the DB", status: "error", error });
                return;
              }
              if (!results.rowCount) {
                response.status(404).send({message: "Phone ID not present", status: "error"});
                return;
              }
              response.status(200).send(`Phone modified with ID: ${id}`)
            }
          )
        }
       
      } catch (error) {
        response.status(404).send({message:"Phone not modified server error", status: "error", error})
      }
    }else{
      response.status(404).send({message: "Phone name is mandatory field", status: "error"})
    }
  }

  const deletePhone = async (request, response) => {
    const id = parseInt(request.params.id)
    try {
      await pool.query('DELETE FROM phones WHERE id = $1', [id], (error, result) => {
        if (error) {
          response.status(404).send({message: "Error in the DB", status: "error", error });
          return;
        }
        if (!result?.rowCount) {
         response.status(400).send({message: `Phone with ID: ${id} not found`, status: "error",})
         return;
        }
          response.status(200).send({message: `Phone deleted with ID: ${id}`, status: "success",})
      })
    } catch (error) {
      response.status(404).send({message: `Phone with ID: ${id} not deleted`, status: "error", error})
    }
  }

  module.exports = {
    getPhones,
    getPhone,
    postPhone,
    updatePhone,
    deletePhone,
  }