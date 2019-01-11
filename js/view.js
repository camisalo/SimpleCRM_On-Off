var Status = {
    ONLINE: 1,
    OFFLINE: 2,
  };

var Tab = {
    ACCOUNTS: 'account',
    CONTACTS: 'contact',
    ASSET: 'asset',
    OPPORTUNITY: 'opportunity',
  };

var Action = {
    DETAILS: 'details',
    NEW: 'new',
}

var activRecord;
var status;
var detailsornew = Action.DETAILS;
var controller = new Controller();


function clearColorTabs() {
    var tabs = document.getElementsByClassName('tabs');
    for (var i=0; i<tabs.length; i++){
        tabs[i].style.backgroundColor = 'transparent';
    }
}

function listenerAccount() {
    clearColorTabs();
    controller.actualTab = Tab.ACCOUNTS;
    this.style.backgroundColor = 'green';
    afterRecordClickListener();
}

function listenerContacts() {
    clearColorTabs();
    controller.actualTab = Tab.CONTACTS;
    this.style.backgroundColor = 'green';
    afterRecordClickListener();
}

function listenerAttempts() {
    clearColorTabs();
    controller.actualTab = Tab.ASSET;
    this.style.backgroundColor = 'green';
    afterRecordClickListener();
}

function listenerOpportunities() {
    clearColorTabs();
    controller.actualTab = Tab.OPPORTUNITY;
    this.style.backgroundColor = 'green';
    afterRecordClickListener();
}

function afterRecordClickListener() {
    controller.changeTab();
    changeToDetails();
}

function addActionListenerToRecords() {
    var content = document.getElementById('content');
    var records = content.childNodes[0].childNodes[0].childNodes;
    var array_records = Array.from(records);

    for (var i = 1; i < array_records.length; i++) {
        (function () {
            var element_id = array_records[i].id;
            array_records[i].addEventListener("click", function() { showDetailsForRecord(element_id); }, false);
        }());
    }
}

// Wyswietlanie detali po kliknięciu na rekord
function showDetailsForRecord(id) {
    controller.showDetails(id).then((data) => {
        if (detailsornew == Action.DETAILS){
            console.log(data);
            activRecord = data;
            if (controller.checkTab() == Tab.ACCOUNTS) showDetailsForAccount(data);
            else if (controller.checkTab() == Tab.CONTACTS) showDetailsForContact(data);
            else if (controller.checkTab() == Tab.ASSET) showDetailsForAsset(data);
            else if (controller.checkTab() == Tab.OPPORTUNITY) showDetailsForOpportunity(data);
        }
    })
    .catch((err) => {alert(err);})
}

function showDetailsForAccount(account) {
    document.getElementsByName('name')[0].value = account.name;
    document.getElementsByName('address')[0].value = account.address;
    document.getElementsByName('phone')[0].value = account.phone;
}

function showDetailsForContact(contact) {
    document.getElementsByName('firstname')[0].value = contact.firstname;
    document.getElementsByName('lastname')[0].value = contact.lastname;
    document.getElementsByName('birthdate')[0].value = contact.birthdate;
    document.getElementsByName('email')[0].value = contact.email;
}

function showDetailsForAsset(asset) {
    document.getElementsByName('name')[0].value = asset.name;
    document.getElementsByName('description')[0].value = asset.description;
    document.getElementsByName('price')[0].value = asset.price;
}

function showDetailsForOpportunity(opportunity) {
    document.getElementsByName('name')[0].value = opportunity.name;
    document.getElementsByName('amount')[0].value = opportunity.amount;
    document.getElementsByName('opendate')[0].value = opportunity.opendate;
    document.getElementsByName('closedate')[0].value = opportunity.closedate;
    document.getElementsByName('stage')[0].value = opportunity.stage;
}

function onload() {
    
    checkStatus();

    var a = document.getElementsByClassName('tabs');
    a[0].addEventListener('click',listenerAccount);
    a[1].addEventListener('click',listenerContacts);
    a[2].addEventListener('click',listenerAttempts);
    a[3].addEventListener('click',listenerOpportunities);

    // lisnery dla Details i New
    var b = document.getElementById('change-details-add').childNodes;
    b[1].addEventListener('click',changeToDetails);
    b[3].addEventListener('click',changeToAdd)

    setInterval(checkStatus,1000);
}

function changeToDetails() {
    detailsornew = Action.DETAILS;
    document.getElementById('details').style.backgroundColor = '#4CAF50';
    document.getElementById('new').style.backgroundColor = '#b6b6b6';
    document.getElementById('button').innerHTML = "<p>Update</p>";
    var button = document.getElementById('button');
    button.removeEventListener('click', addRecord);
    button.innerHTML = "<p>Update</p>";
    button.addEventListener('click', updateRecord);
    insertForm();
}

function changeToAdd() {
    detailsornew = Action.NEW;
    document.getElementById('details').style.backgroundColor = '#b6b6b6';
    document.getElementById('new').style.backgroundColor = '#4CAF50';
    var button = document.getElementById('button');
    button.removeEventListener('click', updateRecord);
    button.innerHTML = "<p>Add</p>";
    button.addEventListener('click', addRecord);

    insertForm();
}

function updateRecord() {
    console.log("UPDATE");
}

//{id: 2, name: "Skanska", address: "Kraków, Warszawska11", phone: "784322975", lastmodified: "2018-12-24T11:44:32.000+0000"}

function addRecord() {
    console.log("ADD");
    var name = document.getElementsByName('name')[0].value;
    var address = document.getElementsByName('address')[0].value;
    var phone = document.getElementsByName('phone')[0].value;

    var record = [{name: name, address: address, phone: phone, lastmodified: new Date().toMysqlFormat()}];

    controller.saveToLocalDb(record);

    console.log(record);
}

function insertForm() {
    var form = document.getElementById('form');
    if (controller.checkTab() == Tab.ACCOUNTS) $( "#form" ).load( "forms/account.html" );
    else if (controller.checkTab() == Tab.CONTACTS) $( "#form" ).load( "forms/contact.html" );
    else if (controller.checkTab() == Tab.ASSET) $( "#form" ).load( "forms/asset.html" );
    else if (controller.checkTab() == Tab.OPPORTUNITY) $( "#form" ).load( "forms/opportunity.html" );
    else form.innerHTML = "ERROR";
}

function checkStatus() {
    var stat = document.getElementById("status");
    if (navigator.onLine) {
        status = Status.ONLINE;
        stat.innerHTML = "Online :D";
        stat.style.backgroundColor = "green";
    } else {
        status = Status.OFFLINE;
        stat.innerHTML = "Offline :(";
        stat.style.backgroundColor = "red"
    }
}


function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + "T" + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

