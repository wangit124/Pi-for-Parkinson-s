<?php
    // Open JSON file and decode data from jquery POST
    $myFile = fopen("/u/acsweb/62/562/luw055/public_html/JSON/credentials.json", "w");
    $txt = $_POST['users'];
    $jsonObject = json_encode($txt);

    // If the file cant be read, return error
    if ($myFile == FALSE) {
        echo "Can't read file!";
        exit;
    }

    // If the file cant be written to, return error
    $fw = fwrite($myFile, $jsonObject);
    if ($fw == FALSE) {
        echo "can't write to file!";
        exit;
    }
    
    // close file
    fclose($myFile);
?>
