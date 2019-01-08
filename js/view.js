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
    controller.changeTab();
}

function listenerContacts() {
    clearColorTabs();
    controller.actualTab = Tab.CONTACTS;
    this.style.backgroundColor = 'green';
    controller.changeTab();
}

function listenerAttempts() {
    clearColorTabs();
    controller.actualTab = Tab.ATTEMPTS;
    this.style.backgroundColor = 'green';
    controller.changeTab();
}

function listenerOpportunities() {
    clearColorTabs();
    controller.actualTab = Tab.OPPORTUNITIES;
    this.style.backgroundColor = 'green';
    controller.changeTab();
}



function onload() {
    
    checkStatus();
    console.log("START");

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

