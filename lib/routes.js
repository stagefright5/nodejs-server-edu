
const routeHandlers = {
    'notFoundHandler': function (data, callbackFn) {
        callbackFn(404, { mesage: 'Resource Not Found' });
    }
};

routeHandlers.userHandler = function (data, callbackFn) {
    // do something with the data and return a result to be sent in the response payload.
    const result = {
        httpStatusCode: 201,
        data: {
            eid: 'szAm1123',
            name: {
                firstName: 'Channamallikaarjuna',
                lastName: 'Menasinakaayi'
            },
            employer: 'Microsoft',
            address: {
                street: '5th Cross, 3rd Main',
                area: 'Madivaala',
                location: 'Bengaluru, Karanataka, India'
            }
        }
    };
    callbackFn(result.httpStatusCode, result.data);
};

export const router = {
    'user': {
        get: routeHandlers.userHandler
    },
    'notFoundHandler': routeHandlers.notFoundHandler
};