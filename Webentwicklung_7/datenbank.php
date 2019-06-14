<?php
    $sqlQuery;
    switch($_REQUEST['mode']){
        case "profilEintragen":
            $sqlQuery = "INSERT INTO `profile` (`name`, `geburtsort`, `ort`, `rolle`, `bild`) VALUES (?, ?, ?, ?, ?)";
            break;
        case "profilAnzeigen":
            $sqlQuery = "SELECT `*` FROM `profile`";
    }
    if(!$sqlQuery) return;

    $mysqli = new mysqli("localhost", "root", "", "AVLdb");
    if($mysqli->connect_error) {
        exit('Could not connect');
    }
    $mysqli->set_charset("utf8");

    $sqlStatement = $mysqli->prepare($sqlQuery);
    if($_REQUEST['mode'] == "profilEintragen") $sqlStatement->bind_param("sssss", $_REQUEST['name'], $_REQUEST['geburtsort'], $_REQUEST['ort'], $_REQUEST['rolle'], $_REQUEST['bild']);
    
    
    $sqlStatement->execute();

    if($_REQUEST['mode'] == "profilEintragen"){
        $sqlStatement->close();
        echo "[]";
        return;
    }

    $sqlResult = $sqlStatement->get_result();
    $sqlStatement->close();

    $result = [];
    while($row = $sqlResult->fetch_row())
    {
        $result[] = $row;
    }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>