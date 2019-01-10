<!DOCTYPE HTML>

<html manifest="cache.manifest" lang="pl"> 
<head>



    <title>System CRM</title>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8"/>

    <link rel="stylesheet" type="text/css" href="style/menu.css"/>
    <link rel="stylesheet" type="text/css" href="style/view.css"/>
    <link rel="shortcut icon" href="#" />
   
    <script src="js/builder/supervisor.js"></script>
    <script src="js/builder/TableBuilder.js"></script>
    <script src="js/singleton.js"></script>
    <script src="js/model.js"></script>
    <script src="js/controller.js"></script>
    <script src="js/view.js"></script>


</head>
<body onload="onload()">

<div id="root">
    <div id="layout">
        <div id="main-menu">
            <ul>
                <li><a class="tabs" href="#Accounts">Accounts</a></li>
                <li><a class="tabs" href="#Contacts">Contacts</a></li>
                <li><a class="tabs" href="#Attempts">Asset</a></li>
                <li><a class="tabs" href="#Opportunities">Opportunity</a></li>
                <li style="float:right"><a id="status" href="#synchro">Status</a>
                <li style="float:right"><a class="active" href="#synchro">Synchronize</a>
            </ul>
        </div>

        <div id="view">
            <div id="left-menu">
                <div id="change-details-add">
                    <div id="details">
                        <p>Details</p>
                    </div>
                    <div id="new">
                        <p>New +</p>
                    </div>
                </div>
                <div id="form">


                    <form action="/action_page.php">
                        Name:<br>
                        <input type="text" name="name">
                        <br>
                        address:<br>
                        <input type="text" name="address">
                        <br>
                        phone:<br>
                        <input type="text" name="phone">
                    </form> 
                    <div id="button">
                        <p>Update</p>
                    </div>

                </div>
            </div>
            <div id="content">

            </div>
        </div>
    </div>
</div>




</body>
</html>
