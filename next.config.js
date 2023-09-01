module.exports = {
    async rewrites() {
        return [

            { source: '/tab3', destination: '/Tab3' },
            { source: '/login', destination: '/Login' },
            { source: '/registration', destination: '/Registration' },
            { source: '/level1', destination: '/Level1' }
        ];
    },
};
