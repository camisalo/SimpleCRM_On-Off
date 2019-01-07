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


function listener(){
    var tabs = document.getElementsByClassName('tabs');
    for (var i=0; i<tabs.length; i++){
        tabs[i].style.backgroundColor = 'transparent';
    }
    this.style.backgroundColor = 'green';
    switch (this.innerHTML){
        case 'Accounts':
            controller.actualTab = Tab.ACCOUNTS;
            break;
        case 'Contacts':
            controller.actualTab = Tab.CONTACTS;
            break;
        case 'Attempts':
            controller.actualTab = Tab.ATTEMPTS;
            break;
        case 'Opportunities':
            controller.actualTab = Tab.OPPORTUNITIES;
            break
    }
    console.log(controller.actualTab);

    controller.readAllRecords();
}



function onload() {
    
    checkStatus();
    console.log("START");

    var a = document.getElementsByClassName('tabs');
    a[0].addEventListener('click',listener);
    a[1].addEventListener('click',listener);
    a[2].addEventListener('click',listener);
    a[3].addEventListener('click',listener);

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

