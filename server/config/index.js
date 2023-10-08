module.exports = {
    "development": {
        'username': "postgres",
        "password": "2053@ezra",
        "database": "whatsapp_business_crm",
        "host": "localhost",
        "dialect": "postgres",
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
        "dialect": "postgres",
        "pool": {
            "max": 5,
            "min": 0,
            "acquire": 30000,
            "idle": 10000
        }
    }
}