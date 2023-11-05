const path = require('path');

module.exports = {
    async rewrites() {
        return [
            { source: "/tab3", destination: "/Tab3" },
            { source: "/login", destination: "/Login" },
            { source: "/registration", destination: "/Registration" },
            { source: "/userpage", destination: "/UserPage" },
            { source: "/level1", destination: "/Level1" },
            { source: "/MainPage", destination: "/MainPage" },
        ];
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};
