export const configuration = () => {
    return Object.freeze({
        DB_HOST: process.env['localhost'],
        DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
        DB_NAME: process.env['DB_NAME'],
        DB_USER: process.env['DB_USER'],
        DB_PASSWORD: process.env['DB_PASSWORD'],
        JWT_SECRET: process.env['JWT_SECRET']
    })
  }