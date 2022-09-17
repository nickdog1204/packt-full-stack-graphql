module.exports = {
    "development": {
        "username": "mamp",
        "password": "dream1204",
        "database": "graphbook_dev",
        "host": "localhost",
        "port": 8889,
        "dialect": "mysql",
        "pool": {
            "max": 5,
            "min": 0,
            "acquire": 30000,
            "idle": 10000
        }
    },
    "production": {
        "host": process.env.host,
        "username": process.env.username,
        "password": process.env.password,
        "database": process.env.database,
        "logging": false,
        "dialect": "mysql",
        "pool": {
            "max": 5,
            "min": 0,
            "acquire": 30000,
            "idle": 10000
        }
    }
}