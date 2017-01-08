// SWITCH the FAKE service from here :
const fakeServiceEnabled = false;

const API = {
    fakeServiceEnabled,
    /* **DEV** Enviroment */
    root: 'http://mycarbioservice.azurewebsites.net/api/v1',

    userCars: '/usercar/details=true',
    carInfo: '/car/{id}/details',
    registerCar: '/car/registration/{regNumber}',
    userAddCar: '/user/{userId}/usercar/add/{carInfoId}',
    userRemoveCar: '/usercar/',
    user: '/user/',
    timeline: '/timeline/',
    post: '/car/',
    search: 'https://mycarbiosearch.search.windows.net/indexes/carinfostaging/docs?api-version=2015-02-28&search=',
    token: '/feeds/token',
    follow: '/follow/car/',
    unFollow: '/unfollow/car/',
    comment: '/comment',
    carImage: '/car/{id}/profile/image',
    likes: '/timeline/likes',
    likeRemove: '/timeline/likes/{postType}/like/{postId}',
    likesCount: '/timeline/likes/{postType}/{postId}/count'
}

if (API.fakeServiceEnabled) {
    API.root = `${window.location.origin}/api/v1`;

    API.search = '/search?';
}

export  { API };