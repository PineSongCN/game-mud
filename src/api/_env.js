let env;
let baseUrl;
// env = 'development';
env = 'development-url';
// env = 'development-tian';
// env = 'development-zhao';
// env = 'production';
if (process.env.NODE_ENV === 'production') {
    env = process.env.NODE_ENV;
}
switch (env) {
    case 'development-url':
        baseUrl = {
            base: process.env.VUE_APP_BASE_API
        };
        break;
    case 'development-zhao':
        baseUrl = {
            base: '/proxy-dev-base'
        };
        break;
    case 'development-tian':
        baseUrl = {
            base: '/proxy-dev-tian'
        };
        break;
    case 'development':
        baseUrl = {
            base: '/proxy-base'
        };
        break;
    case 'production':
    default:
        baseUrl = {
            base: process.env.VUE_APP_BASE_API
        };
        break;
}
export default baseUrl;
