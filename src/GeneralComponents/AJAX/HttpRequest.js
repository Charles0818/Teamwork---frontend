const sendHttpRequest = (method, url, data, authToken ) => {
    return fetch(url, {
        method:method,
        body:JSON.stringify(data),
        headers: data ? {
            'Content-Type': 'application/json',
            'authorization': authToken ? `Bearer ${authToken}` : ""
        } : {'Authorization': `Bearer ${authToken}`}
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

exports.getData = (url) => sendHttpRequest('GET', url).then(data => console.log(data))

exports.sendData = (url, data) => sendHttpRequest('POST', url, data)
