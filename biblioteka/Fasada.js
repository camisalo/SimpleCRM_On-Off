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
            console.log("Pobrano rekordy z bazy danch");
            this.ldb.getRecords(this.name);
        })
        .then((data) => {
            this.local_records = data;
            console.log("Pobrano rekordy z lokalnej bazy");
            var i, c_rec, l_rec, res;
            var recordToUpdate = [];
            for (i=0;i<central_records.length;i++){
                c_rec = central_records[i];
                l_rec = this.getRecordById(c_rec.id);
                res = strategy.compare(central_records[i]);
                if (res == "central") recordToUpdate.push(c_rec);
            }
            console.log(recordToUpdate);
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
        for (i=0;i<this.list.lenght;i++){
            console.log(tableName[i].getName());
            if (this.tableName[i].getName() == tableName){
                this.tableName[i].synchronize();
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




