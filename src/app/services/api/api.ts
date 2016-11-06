// SWITCH the FAKE service from here :
const fakeServiceEnabled = true;

const API = {
    fakeServiceEnabled,
    /* **DEV** Enviroment */
    root: 'http://mycarbioservice.azurewebsites.net/api/v1',

    userCars: '/usercar/details=true',
    userRegisterCar: '/usercar/registration/',
    userRemoveCar: '/usercar/',
    user: '/user/',
    timeline: '/timeline/',
    post: '/car/',
    search: 'https://mycarbiosearch.search.windows.net/indexes/carinfostaging/docs?api-version=2015-02-28&search=',
    token: '/feeds/token',
    follow: '/follow/',
    unFollow: '/unfollow/',
    comment: '/comment'
}

if (API.fakeServiceEnabled) {
    API.root = `${window.location.origin}/api/v1`;

    API.search = '/search?';
}

export  { API };