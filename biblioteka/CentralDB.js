class CentralDB {
    
    getRecords(url) {
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
            httpReq.setRequestHeader('Content-Type','application/json');
            httpReq.send(null);
        });
    }

    insertRecords(data, url) {
        return new Promise((resolve, reject) => { 
            if (data.length > 0){
                var httpReq = new XMLHttpRequest(); 
                httpReq.onreadystatechange = () => { 
                    if (httpReq.readyState === 4 && httpReq.status === 200) {
                        // console.log("WYSŁANO " + httpReq.statusText);
                        resolve("OK"); 
                    } else { 
                        // console.log(httpReq.statusText);
                        // reject(new Error(httpReq.status)); 
                    } 
                    
                }
                httpReq.open("POST", url, true); 
                httpReq.setRequestHeader('Content-Type','application/json');
                httpReq.send(JSON.stringify(data));
            }
            resolve("OK");
        });  
    }
}