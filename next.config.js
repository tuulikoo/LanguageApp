module.exports = {
    async rewrites() {
        return [
            { source: '/tab1', destination: '/Tab1' },
            { source: '/tab2', destination: '/Tab2' },
            { source: '/tab3', destination: '/Tab3' },
            { source: '/Login', destination: '/Login' },
        ];
    },
};
