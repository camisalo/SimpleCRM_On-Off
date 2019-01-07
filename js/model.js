class Model {

    getAccounts() {
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
            httpReq.open("GET", "http://localhost:8080/crm/account", true); 
            httpReq.withCredentials = true;
            httpReq.setRequestHeader('Content-Type','application/json');
            httpReq.send(); 
        });    
    }



    addRecord() {

    }
}