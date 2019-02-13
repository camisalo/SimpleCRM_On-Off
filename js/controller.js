var model = new Model();

class Controller {

   constructor(){
      this.actualTab = Tab.ACCOUNTS;
      this.localdb = localdb.getInstance();

      this.content = document.getElementById('content');

      this.synchronizer = new DatabaseSynchronizer("CRM");
      this.synchronizer.addTable("account","http://localhost:8080/crm/account");
      this.synchronizer.addTable("contact","http://localhost:8080/crm/contact");
      this.synchronizer.addTable("asset","http://localhost:8080/crm/asset");
      this.synchronizer.addTable("opportunity","http://localhost:8080/crm/opportunity");
      // this.synchronizer.setStrategy(1);
   }

   synchronize(){
      this.synchronizer.synchronize();      
    }
      
   changeTab() {
      // console.log("changetab()");
      if (this.actualTab != undefined){
            model.getRecords(this.actualTab)
            .then((data) => {
                  controller.showRecords(data);
                  addActionListenerToRecords();
            })
            .catch((err) => {alert(err);}
            );
      }
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
               resolve(model.getRecordsById(this.actualTab, id))
            })
            .catch((err) => {alert(err);}
         );
      });
   }

   saveRecord(record) {
      model.saveToLocalDB(record, this.actualTab)
      .then((data) => {
         console.log(data);
         controller.changeTab();
      });
   }

   deleteRecord(record_id) {
      model.getRecordsById(this.actualTab, record_id)
            .then((data) => {
               data.lastmodified = new Date().toMysqlFormat();
               data.state = "delete";
               data = [data];
               console.log(data);

               return model.saveToLocalDB(data, this.actualTab);
            })
            .then((data) => {
               controller.changeTab();
            })
            .catch((err) => {alert(err);}
         );
   }
   
}