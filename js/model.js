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
//TO DO !!!!!!!!!!!!!!!!

    syncWithServer(data, url) {
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
            httpReq.open("POST", url, true); 
           // httpReq.withCredentials = false;
            httpReq.setRequestHeader('Content-Type','application/json');
            //httpReq.setRequestHeader
            httpReq.send(data); 
        });  
    }

// zapisywanie całej tablicy w lokalnej bazie danych
    saveToLocalDB(data, tab) {
        var openRequest = window.indexedDB.open("CRM", 1);

        openRequest.onerror = function(event) {
            console.log(event);
        };
        openRequest.onsuccess = function(event) {

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
                    console.log(data[i]);
                    itemStore.put(data[i]).onsuccess = putNext;
                    ++i;
                } else {   // complete
                    console.log('populate complete');
                    //callback();
                }
            }   
        }
    }
// zapisywanie jednego rekordu w lokalnej bazie danych (chyba nie potrzeba :p)
    // saveRecordToLocalDB(data, tab) {

    // }


    getRecords(tab){
        return new Promise((resolve, reject) => {
            var openRequest = window.indexedDB.open("CRM", 1);

            openRequest.onerror = function(event) {
                console.log(event);
            };
            openRequest.onsuccess = function(event) {

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

    getRecordsById(tab, id){
        return new Promise((resolve, reject) => {
            var openRequest = window.indexedDB.open("CRM", 1);

            openRequest.onerror = function(event) {
                console.log(event);
            };
            openRequest.onsuccess = function(event) {

                var db = openRequest.result;
                db.onerror = function(event) {
                    // Generic error handler for all errors targeted at this database's requests
                    console.error(event.target);
                    window.alert("Database error: " + event.target.wePutrrorMessage || event.target.error.name || event.target.error || event.target.errorCode);
                };
                console.log(id);
                var transaction = db.transaction(tab, 'readonly');
                var itemStore = transaction.objectStore(tab);
            
                var request = itemStore.get(parseInt(id));
                request.onsuccess = function() {
                    console.log("Model --> " + request.result);
                    resolve(request.result);
                };
                
            }
        });
    }
}