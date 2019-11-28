const sendHttpRequest = (method, url, data, authToken ) => {
    if(method === 'GET' || method === 'DELETE') {
        return fetch(url, {
            method:method,
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': authToken ? `Bearer ${authToken}` : ""
            }
        }).then(res => {
            if(res.status >= 400) {
                return res.json().then(errRes => {
                    throw errRes
                });
            }
            return res.json()
        });
    }
    return fetch(url, {
        method:method,
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': authToken ? `Bearer ${authToken}` : ""
        }
    }).then(res => {
        if(res.status >= 400) {
            return res.json().then(errRes => {
                throw errRes
            });
        }
        return res.json()
    });
}

exports.apiKey = 'https://teamworkbycharles.herokuapp.com/api/v1';

exports.getData = (url, userId, authToken) => sendHttpRequest('GET', `${url}/${userId}`, null, authToken)

exports.sendData = (url, data, authToken) => sendHttpRequest('POST', url, data, authToken);
exports.modifyData = (url, data, authToken) => sendHttpRequest('PATCH', url, data, authToken);
exports.deleteData = (url, userId, authToken) => sendHttpRequest('DELETE', `${url}/${userId}`, null, authToken);
