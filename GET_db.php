<?php
    /* DB 연결 정보*/
    $host = "139.150.80.81"; //139.150.80.81
    $user = "enviot";//enviot
    $pw = "env194^9*";//env194^9*
    $dbName = "lock_iot";//lock_iot
    $table_name = ['uid','mac_id','type_no','get_time','value','time'];
    $conn = new mysqli($host, $user, $pw, $dbName);
    $tw = "disconnect";
    /* DB 연결 확인 */
    if($conn){ // 연결 성공
        /* DB SELECT*/
        $index = $_GET['index'];
        $period = $_GET['period']/ 1000;
        //$period = $period / 1000;
        $sql = "SELECT * FROM iot_raw_data ORDER BY time DESC LIMIT 6;";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_array($result);
        $tw = "connect";//connect
        /*echo "uid: " . $row["uid"]. " mac_id: " . $row["mac_id"]. " type_no: " . $row["type_no"]. " get_time: " . $row["get_time"]." value: " . $row["value"]." time: " . $row["time"]."<br>";*/
        /* DB INSERT*/
        /*$sql = "INSERT INTO MyGuests (uid, mac_id, type_no, get_time, value, time)VALUES ('1234','1234124','4647c962f65d','1','2','222')";
        if ($conn->query($sql) === TRUE) {
            //echo "New record created successfully";
            $tw = "New record created successfully";
        }else{
            //echo "Error: " . $sql . "<br>" . $conn->error;
            $tw = "Error";
        }*/
        $json = json_encode(array('uid' => $row[$table_name[0]], 'mac_id' => $row[$table_name[1]], 'type_no' => $row[$table_name[2]], 'get_time' => $row[$table_name[3]], 'value' => $row[$table_name[4]], 'time' => $row[$table_name[5]], 'index' => $index, 'tw' => $tw, 'period' => $period));
        echo($json);
        mysqli_close($conn);
    }else{ // 연결 실패 
        $index = $_GET['index'];
        $period = $_GET['period']/ 1000;
        $tw = "disconnect";//connect
        $json = json_encode(array('index' => $index, 'tw' => $tw, 'period' => $period));
        echo($json);
    }
?>