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
        model.getRecordsFromServer("http://localhost:8080/crm/asset")
           .then((data) => {
               content.innerHTML = data;
               
               model.saveToLocalDB(data, Tab.ASSET);
            })
            .catch((err) => {alert(err);}
        );
        model.getRecordsFromServer("http://localhost:8080/crm/opportunity")
           .then((data) => {
               content.innerHTML = data;
               
               model.saveToLocalDB(data, Tab.OPPORTUNITY);
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

   checkTab() {
      return this.actualTab;
   }

   showRecords(data){
      var content = document.getElementById('content');
      var builder
      if (this.actualTab == Tab.ACCOUNTS) builder = new AccountBuilder(data);
      else if (this.actualTab == Tab.CONTACTS) builder = new ContactBuilder(data);
      else if (this.actualTab == Tab.ASSET) builder = new AssetBuilder(data);
      else if (this.actualTab == Tab.OPPORTUNITY) builder = new OpportunityBuilder(data);
      var supervisor = new Supervisor(builder);
      supervisor.build();
      var res = builder.getResoult();
      content.innerHTML = res;
   }

   showDetails(id) {
      return new Promise((resolve, reject) => {
         model.getRecordsById(this.actualTab, id)
            .then((data) => {
               resolve(data)

            })
            .catch((err) => {alert(err);}
         );
      });
   }

   saveToLocalDb(record) {
      model.saveToLocalDB(record, this.actualTab);
      model.syncWithServer(record, "http://localhost:8080/crm/account")
         .then((data) => {
            changeTab();
         })
         .catch((err) =>{alert(err);}
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