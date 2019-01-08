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
           // httpReq.withCredentials = false;
            httpReq.setRequestHeader('Content-Type','application/json');
            //httpReq.setRequestHeader
            httpReq.send(null); 
        });    
    }

    saveToLocalDB(data, tab) {
        var openRequest = window.indexedDB.open("CRM", 1);
        console.log('XX 1');

        openRequest.onerror = function(event) {
            console.log(event);
        };
        openRequest.onsuccess = function(event) {
            console.log('XX 2');

            var db = openRequest.result;
            db.onerror = function(event) {
                // Generic error handler for all errors targeted at this database's requests
                console.error(event.target);
                window.alert("Database error: " + event.target.wePutrrorMessage || event.target.error.name || event.target.error || event.target.errorCode);
            };
            console.log(tab);
            var transaction = db.transaction(tab, 'readwrite');
            var itemStore = transaction.objectStore(tab);
            var i=0;
            putNext();

            function putNext() {
                if (i<data.length) {
                    itemStore.put(data[i]).onsuccess = putNext;
                    ++i;
                } else {   // complete
                    console.log('populate complete');
                    //callback();
                }
            }   
        }
    }


    readRecords(tab){
        return new Promise((resolve, reject) => {
            var openRequest = window.indexedDB.open("CRM", 1);
            console.log('XX 1');

            openRequest.onerror = function(event) {
                console.log(event);
            };
            openRequest.onsuccess = function(event) {
                console.log('XX 2');

                var db = openRequest.result;
                db.onerror = function(event) {
                    // Generic error handler for all errors targeted at this database's requests
                    console.error(event.target);
                    window.alert("Database error: " + event.target.wePutrrorMessage || event.target.error.name || event.target.error || event.target.errorCode);
                };
                console.log(tab);
                var transaction = db.transaction(tab, 'readonly');
                var itemStore = transaction.objectStore(tab);
            
                if ('getAll' in itemStore) {
                    // IDBObjectStore.getAll() will return the full set of items in our store.
                    itemStore.getAll().onsuccess = function(event) {
                        resolve(event.target.result);
                    };
                }
            }
        });
    }
}