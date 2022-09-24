const {app} = require('./app');
const {db} = require('./utils/database.utils');
const { initModels } = require('./models/initModels')



const serverStart = async () => {
    try {
        await db.authenticate();


        initModels();


        await db.sync();

        PORT = 4000;
        
        app.listen(PORT,() =>{
            console.log("Express app running!");
        })
    } catch (error) {
        console.log(error);
    }
}

serverStart()