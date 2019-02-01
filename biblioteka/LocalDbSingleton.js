//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;
               
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange


var localdb = (function () {
    var instance;
 
    function createInstance(localDbName) {
        if (!window.indexedDB) {
           window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }

        var request = window.indexedDB.open(localDbName);
   
        request.onerror = function(event) {
           console.log("error: ");
        };
               
        request.onsuccess = function(event) {
           instance = request.result;
           console.log("success: "+ instance);
        };
   
        request.onupgradeneeded = function(event) {
            instance = event.target.result;
        }
    }
 
    return {
        getInstance: function (localDbName) {
            if (!instance) {
                instance = createInstance(localDbName);
            }
            return instance;
        }
    };
 })();
 