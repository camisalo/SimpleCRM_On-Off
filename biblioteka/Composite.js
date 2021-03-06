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
    
    constructor(name, endpoint, localDbName) {
        super();
        this.name = name;
        this.endpoint = endpoint;
        this.localDbName = localDbName;
    }

    synchronize(strategy) {
        this.cdb = new CentralDB();
        this.ldb = new LocalDB();
        this.cdb.getRecords(this.endpoint)
        .then((data) => {
            this.central_records = data;
            return this.ldb.getRecords(this.name);
        })
        .then((data) => {
            this.local_records = data;
            var recordToUpdate = [];
            if (this.local_records != undefined){
                var i, c_rec, l_rec, res;
                for (i=0;i<this.local_records.length;i++){
                    l_rec = this.local_records[i];
                    c_rec = this.getRecordById(l_rec.id);
                    res = strategy.compare(l_rec,c_rec[0]);
                    if (res == "local") recordToUpdate.push(l_rec);
                }
            }
            return this.cdb.insertRecords(recordToUpdate,this.endpoint);
        })
        .then((data) => {
            return this.ldb.deleteAllRecords(this.name);
        })
        .then((data) => {
            return this.cdb.getRecords(this.endpoint);
        })
        .then((data) => {
            if (data != undefined){
                this.ldb.insertRecords(data, this.name);
            }
        })        
    }



    getRecordById(id) {
        return this.central_records.filter(
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

    synchronize(strategy) {
        var i;
        for (i=0;i<this.list.length;i++){
           this.list[i].synchronize(strategy);
        }
    }

    getByTableName(strategy, tableName) {
        var i;
        for (i=0;i<this.list.length;i++){
            if (this.list[i].getName() == tableName){
                this.list[i].synchronize(strategy);
            }
        }
    }

    add(name, endpoint, localDbName) {
        var table = new Table(name, endpoint, localDbName);
        this.list.push(table);
    }

    remove(record){
        var index = this.list.indexOf(record);
        if(index>=0) {
            this.list.splice(index, 1);
        }
    }
}




