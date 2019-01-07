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
 
    function createInstance() {
        // var object = new Object("I am the instance");
        // return object;



        if (!window.indexedDB) {
           window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        const account = [
            { id: 2, name: "Skanska", address: "Kraków, Warszawska 11", phone: "784322975", date: "2018-12-24T11:44:32.000+0000"},
            { id: 3, name: "Mostostal", address: "Kraków, Mazowiecka 22", phone: "827393836", date: "2018-12-24T11:45:30.000+0000"}
         ];

        var request = window.indexedDB.open("CRM", 1);
   
        request.onerror = function(event) {
           console.log("error: ");
        };
               
        request.onsuccess = function(event) {
           instance = request.result;
           console.log("success: "+ instance);
        };
   
        request.onupgradeneeded = function(event) {
        instance = event.target.result;
        var objectStore1 = instance.createObjectStore("account", {keyPath: "id"});
        var objectStore2 = instance.createObjectStore("contact", {keyPath: "id"});
        var objectStore3 = instance.createObjectStore("attempt", {keyPath: "id"});
        var objectStore4 = instance.createObjectStore("opportunities", {keyPath: "id"});
        }
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
 })();
 