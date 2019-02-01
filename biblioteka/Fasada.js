class ITable {
    constructor() {
        if (new.target === ITable) {
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
        super();
        this.name = name;
        this.endpoint = endpoint;
    }

    synchronize(strategy) {
        this.cdb = new CentralDB();
        this.ldb = new LocalDB();
        this.cdb.getRecords(this.endpoint)
        .then((data) => {
            this.central_records = data;
            console.log("Pobrano rekordy z centralnej bazy danch");
            console.log(this.central_records);
            this.ldb.getRecords(this.name);
        })
        .then((data) => {
            this.local_records = data;
            var recordToUpdate = [];
            if (this.local_records != undefined){
                console.log("Pobrano rekordy z lokalnej bazy");
                console.log(this.local_records);
                var i, c_rec, l_rec, res;
                for (i=0;i<this.local_records.length;i++){
                    l_rec = this.local_records[i];
                    c_rec = this.getRecordById(l_rec.id);
                    res = strategy.compare(l_rec,c_rec);
                    if (res == "central") recordToUpdate.push(c_rec);
                }
                console.log(recordToUpdate);
            }
            this.cdb.insertRecords(recordToUpdate);
        })
        .then((data) => {
            this.cdb.getRecords(this.endpoint);
        })
        .then((data) => {
            if (data != undefined){
                this.ldb.insertRecords(data, this.name);
            }
        })




        // compare local records with server and save latest version

        // send to server updated records

        // delete local records

        
    }



    getRecordById(id) {
        return this.local_records.filter(
            function(data){ return data.id == id }
        );
    }

    getName(){
        return this.name;
    }
}

class TableCollection extends ITable {
    
    constructor() {
        super();
        this.list = [];
    }

    synchronize(strategia) {
        var i;
        for (i=0;i<this.list.length;i++){
           this.list[i].synchronize(strategia);
        }
    }

    getByTableName(tableName) {
        var i;
        for (i=0;i<this.list.length;i++){
            console.log(this.list[i].getName());
            if (this.list[i].getName() == tableName){
                this.list[i].synchronize();
            }
        }
    }
    add(name, endpoint) {
        var table = new Table(name, endpoint);
        this.list.push(table);
    }

    remove(record){
        var index = this.list.indexOf(record);
        if(index>=0) {
            this.list.splice(index, 1);
        }
    }
}




