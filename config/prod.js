//production keys 
module.exports = {
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    COOKIE_KEY: process.env.COOKIE_KEY,
    CALLBACK_URL: process.env.CALLBACK_URL,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    STRIPE_PUBLIC_KEY : process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY : process.env.STRIPE_SECRET_KEY,
    SEND_GRID_KEY : process.env.SEND_GRID_KEY,
    //this is for the links in the sendGrid mailer Template 
    REDIRECT_DOMAIN : process.env.REDIRECT_DOMAIN,
    SECURE_COOKIE : process.env.SECURE_COOKIE
}