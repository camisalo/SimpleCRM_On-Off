let Strategies = Object.freeze({ "ChooseRecordToSave": 1, "TakeLastDate": 2 });

//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;
               
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

/* Facade */
class DatabaseSynchronizer {

    constructor(localDbName) {
        this.localDbName = localDbName;
        this.localDb = window.indexedDB.open(localDbName);
        this.localDbTables = {};
        this.tableCollection = new TableCollection();
    }
    
    setStrategy(strategy) {
        switch(strategy) {
            case 1:
                this.strategy = Strategies.ChooseRecordToSave;
                break;
            case 2:
                this.strategy = Strategies.TakeLastDate;
                break;
            default:
                this.strategy = Strategies.TakeLastDate;
        }
    }

    addTable(localName, serverEndpoint) {
        this.localDbTables[localName] = serverEndpoint;
    }

    removeTable(localName) {
        delete this.localDbTables[localName];
    }

    synchronize() {
        for(let i = 0; i < tableCollection.list.lenght; ++i) {
            tableCollection.list[i].synchronize();
        }
    }

    synchronize(tableName) {
        this.tableCollection.getByTableName(tableName).synchronize();
    }
}
