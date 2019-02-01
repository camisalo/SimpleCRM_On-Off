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