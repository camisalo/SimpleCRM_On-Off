



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
        this.ldb = [];
    }

    synchronize(strategy) {
        var cdb = new CentralBase();
        this.ldb = new LocalDB();
        cb.getRecords(this.endpoint)
        .then((data) => {
            this.central_records = data;
            console.log("Pobrano rekordy z bazy danch");
            this.ldb.getRecords(this.name);
        })
        .then((data) => {
            this.local_records = data;
            console.log("Pobrano rekordy z lokalnej bazy");
            var c_rec, l_rec;
            var recordToUpdate = [];
            for (i=0;i<central_records.length;i++){
                c_rec = central_records[i];
                l_rec = this.getRecordById(c_rec.id);
                strategy.compare(central_records[i]);
            }
        })




        // compare local records with server and save latest version

        // send to server updated records

        // delete local records

        
    }



    getRecordById(id) {
        return this.ldb.filter(
            function(data){ return data.id == id }
        );
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

