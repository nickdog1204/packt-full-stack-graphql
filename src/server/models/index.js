const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    require('babel-plugin-require-context-hook/register')()
}

module.exports = (sequelize) => {

    let db = {};

    const context = require.context('.', true,

        /^\.\/(?!index\.js).*\.js$/, 'sync')

    context.keys().map(context).forEach(module => {

        const model = module(sequelize, Sequelize);

        db[model.name] = model;

    });

    Object.keys(db).forEach((modelName) => {

        if (db[modelName].associate) {

            db[modelName].associate(db);

        }

    });

    return db;

};