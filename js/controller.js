var model = new Model();

class Controller {

   constructor(){
      this.actualTab = Tab.ACCOUNTS;
      this.localdb = localdb.getInstance();

      this.synchronize();
      this.content = document.getElementById('content');
   }

   synchronize(){
      model.getRecordsFromServer("http://localhost:8080/crm/account")
           .then((data) => {
               content.innerHTML = data;
               
               model.saveToLocalDB(data, Tab.ACCOUNTS);
            })
            .catch((err) => {alert(err);}
        );
        model.getRecordsFromServer("http://localhost:8080/crm/contact")
           .then((data) => {
               content.innerHTML = data;
               
               model.saveToLocalDB(data, Tab.CONTACTS);
            })
            .catch((err) => {alert(err);}
        );
     }
      
   changeTab() {
      model.getRecords(this.actualTab)
         .then((data) => {
            controller.showRecords(data);
            addActionListenerToRecords();
         })
         .catch((err) => {alert(err);}
      );
   }

   showRecords(data){


      var supervisor = new Supervisor();
      supervisor.build();



      var content = document.getElementById('content');
      var table = "<table><tr><th>Name</th><th>address</th><th>phone</th></tr>";
      var i;
      for (i=0;i<Object.keys(data).length;i++){
         table += "<tr id=\""+data[i].id+"\"><td>"+ data[i].name+"</td><td>"+data[i].address+"</td><td>"+data[i].phone+"</td></th>";
      }
      table += "</table>";
      content.innerHTML = table;
   }

   showDetails(id) {
      model.getRecordsById(this.actualTab, id)
         .then((data) => {
            var details = document.getElementById('form');
            details.innerHTML = data;

         })
         .catch((err) => {alert(err);}
      );
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


    loadata() {
        console.log(this.actualTab);

        this.localdb.read().then((data) => {
            console.log(data);
            console.log("siema");
        })

        
        // getAsync(this.localdb.read(), function callback(data) { 
        //     console.log(data); 
        // });

        // this.content.appendChild('table')
    }

    readAllRecords() {
        if (status == Status.OFFLINE){
            console.log("OFFLINE");
            // wyświetl na View

        } else if ( status == Status.ONLINE){
            console.log("ONLINE");
             // JSON --> [ {  }, { } , { }  ]
            
             // zapisz w lokalnej bazie danych JSONa

             // wyświetl na View
    
        }
    }
}