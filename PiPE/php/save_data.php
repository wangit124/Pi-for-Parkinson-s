<?php
if (empty($_POST['users'])) {
    echo "No name found";
    exit;
}
$myFile = fopen("../JSON/credentials.json", "w");
$txt = $_POST['users'];
$jsonObject = json_encode($txt);
fwrite($myFile, $jsonObject);
echo "we did it!";
fclose($myFile);
?>