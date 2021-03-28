const Sequelize = require('sequelize');

const sequelize = new Sequelize('carmania', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});
sequelize.authenticate().then(() => {
  sequelize.sync({
 // force:true
  });
  console.log('connection established successfully.');
}).catch((err) => {
  console.error('unable to connect to the database:', err);
});

module.exports = sequelize;
 