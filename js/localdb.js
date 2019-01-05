var db;


class localdb {


   constructor(){
      if (!window.indexedDB) {
         window.alert("Your browser doesn't support a stable version of IndexedDB.")
      }
      const account = [
         { id: "00-01", name: "Aloizy", phone: "827293928", age: 35, email: "alakalsd@powalikos.com" },
         { id: "00-02", name: "Jamajka", phone: "329273627", age: 666, email: "asfasfa@kolpaka.com" }
      ];
      const contact = [
         { id: "00-01", firstname: "Aloizy", lastname: "Mieczysław", age: 35, email: "gasga@asfasfa.com" },
         { id: "00-02", firstname: "Jamajka",lastname: "Kobyła", age: 32, email: "asfassag@asfasf.com" }
      ];
      db;
      var request = window.indexedDB.open("CRM", 1);

      request.onerror = function(event) {
         console.log("error: ");
      };
            
      request.onsuccess = function(event) {
         db = request.result;
         console.log("success: "+ db);
      };

      request.onupgradeneeded = function(event) {
      db = event.target.result;
      var objectStore1 = db.createObjectStore("account", {keyPath: "id"});
      var objectStore2 = db.createObjectStore("contact", {keyPath: "id"});

         for (var i in account) {
            objectStore1.add(account[i]);
         }
         for (var i in contact) {
            objectStore2.add(contact[i]);
         }
      }
   }

   opendb() {
      db;
      var request = indexedDB.open("CRM", 1);  
  
      request.onsuccess = function (evt) {
         db = request.result; 
      }
   }
    

    

   read() {
      return new Promise((resolve, reject) => {
         var transaction = db.transaction(["account"],"readwrite");
         var objectStore = transaction.objectStore("account");
         var request = objectStore.get("00-01");
         console.log("XDXDDXD");
         request.onerror = function(event) {
            alert("Unable to retrieve daa from database!");
         };
         
         // var x = document.getElementById("content");
         // x.innerHTML = "<table><th><td>BYCZ</td><td> ELO</td></th></table>";
         
         request.onsuccess = function(event) {
            var res = event.target.result;

            if(request.result) {
               var x = document.getElementById("content");
               x.innerHTML = "<table><th><td>"+res.name+"</td><td> "+ res.email + "</td></th></table>";
               resolve("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
            } else {
               reject("Kenny couldn't be found in your database!");
            }
         };
      }); 
   }

   readAll(_tab) {
      var objectStore = db.transaction([_tab]).objectStore(_tab);
      
      objectStore.openCursor().onsuccess = function(event) {
         var cursor = event.target.result;
         
         if (cursor) {
            alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Phone: " + cursor.value.phone + ", Email: " + cursor.value.email);
            cursor.continue();
         } else {
            alert("No more entries!");
         }
      };
   }
}