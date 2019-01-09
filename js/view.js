var Status = {
    ONLINE: 1,
    OFFLINE: 2,
  };

var Tab = {
    ACCOUNTS: 'account',
    CONTACTS: 'contact',
    ATTEMPTS: 'attempt',
    OPPORTUNITIES: 'opportunities',
  };

var status;
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
    controller.actualTab = Tab.ATTEMPTS;
    this.style.backgroundColor = 'green';
    afterRecordClickListener();
}

function listenerOpportunities() {
    clearColorTabs();
    controller.actualTab = Tab.OPPORTUNITIES;
    this.style.backgroundColor = 'green';
    afterRecordClickListener();
}

function afterRecordClickListener() {
    controller.changeTab();
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



function showDetailsForRecord(id) {
    console.log("POM" + id);
    controller.showDetails(id);

}



function onload() {
    
    checkStatus();

    var a = document.getElementsByClassName('tabs');
    a[0].addEventListener('click',listenerAccount);
    a[1].addEventListener('click',listenerContacts);
    a[2].addEventListener('click',listenerAttempts);
    a[3].addEventListener('click',listenerOpportunities);

    setInterval(checkStatus,1000);
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

