const API = {
    fakeServiceEnabled: null,
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

// SWITCH the FAKE service from here :
API.fakeServiceEnabled = false;

if (API.fakeServiceEnabled) {
    API.root = `${window.location.origin}/api/v1`;

    API.search = '/search?';
}

export  { API };