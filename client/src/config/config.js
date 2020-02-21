const config = {
    apiUrl: process.env.NODE_ENV === "production"
        ? window.location.origin
        : "http://localhost:3000"

};

module.exports = config;