class Model {

    getRecordsFromServer(url) {
        return new Promise((resolve, reject) => { 
            var httpReq = new XMLHttpRequest(); 
            httpReq.onreadystatechange = () => { 
                if (httpReq.readyState === 4) { 
                    if (httpReq.status === 200) { 
                        resolve(JSON.parse(httpReq.responseText)); 
                    } else { 
                       reject(new Error(httpReq.statusText)); 
                    } 
                } 
            }
            httpReq.open("GET", url, true); 
            httpReq.withCredentials = true;
            httpReq.setRequestHeader('Content-Type','application/json');
            httpReq.setRequestHeader('x-Trigger', 'CORS')
            httpReq.send(); 
        });    
    }



    addRecord() {

    }
}