
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
        });  
    }
}

class LocalDB {
    getRecords(tab) {
        return new Promise((resolve, reject) => {

            var db = localdb.getInstance();
            var transaction = db.transaction(tab, 'readonly');
            var itemStore = transaction.objectStore(tab);
            
            if ('getAll' in itemStore) {
                itemStore.getAll().onsuccess = function(event) {
                    resolve(event.target.result);
                };
            }
        });
    }

    insertRecords(data, tab) {
        return new Promise((resolve) => {

            var db = localdb.getInstance();
            // console.log(tab);
            var transaction = db.transaction(tab, 'readwrite');
            var itemStore = transaction.objectStore(tab);
            var i=0;
            putNext();
            
            function putNext() {
                if (i<data.length) {
                    // console.log(data[i]);
                    itemStore.put(data[i]).onsuccess = putNext;
                    ++i;
                } else {   // complete
                // console.log('populate complete');
                resolve("complete");
                }
            }   
        });
    }

    getRecordById(id, tab){
        return new Promise((resolve, reject) => {
            var db = localdb.getInstance();

            // console.log(id);
            var transaction = db.transaction(tab, 'readonly');
            var itemStore = transaction.objectStore(tab);
        
            var request = itemStore.get(parseInt(id));
            request.onsuccess = function() {
                // console.log("Model --> " + request.result);
                resolve(request.result);
            };
            
        });
    }

    
    deleteAllRecords(tab) {
        return new Promise((resolve) => {

            var db = localdb.getInstance();
            var transaction = db.transaction(tab, 'readwrite');
            var itemStore = transaction.objectStore(tab);
            
            var objectStoreRequest = itemStore.clear();

            objectStoreRequest.onsuccess = function(event) {
                resolve("Wyczyszczono");
            };
        });
    }
}

class ITable {
    constructor() {
        if (new.target === Abstract) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        if (this.synchronize === undefined) {
          // or maybe test typeof this.method === "function"
          throw new TypeError("Must override method");
        }
    }
}

class Table extends ITable {
    
    constructor(name, endpoint) {
        this.name = name;
        this.endpoint = endpoint;
    }

    synchronize() {
        var cb = new CentralBase();
        cb.getRecords(this.endpoint)
        .then((data) => { })
        // compare local records with server and save latest version

        // send to server updated records

        // delete local records

        
    }
}

class TableCollection extends ITable {
    
    constructor() {
        this.list = [];
    }

    synchronize(strategia) {
        var i;
        for (i=0;i<this.list.length;i++){
           this.list[i].synchronize(strategia);
        }
    }

    add(record) {
        this.list.push(record);
    }

    remove(record){
        var index = this.list.indexOf(record);
        if(index>=0) {
            this.list.splice(index, 1);
        }
    };
}



class DatabaseSynchronizer {

    constructor() {

    }

    addTable(name) {

    }
    
}

