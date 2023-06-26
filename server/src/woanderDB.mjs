import { MongoClient, ServerApiVersion } from 'mongodb';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function runConnection() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

export async function insertUser(user) {  
//funzione che sarà chiamata ogniqualvolta si vorrà inserire qualcosa in una collection (che è un oggetto)
//se ad esempio viene chiamata insertUser avrà come parametro lo user da inserire insertUser(user)
  try {
    await client.connect()
    const database = client.db(process.env.NAME_DB);
    const usersCollection = database.collection("users");
    const result = await usersCollection.insertOne(user);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (err) {
      return(err.code)
      //MongoDb ritorna un errore il cui code è 11000: 
      //è il codice associato all'errore dell'username non univoco
      //se abbiamo 11000 ritorniamo tale valore come risultato della promise
      //e lo gestiamo server side.
  } finally {
      await client.close();
  }
}

export async function findUser(user) {
  try {
    await client.connect()
    const database = client.db(process.env.NAME_DB);  
    const usersCollection = database.collection("users");  
    let foundUser = await usersCollection.findOne(user)
    return foundUser
  }catch(err) {
      console.log(err);
  }finally {
      await client.close();
  }
}
