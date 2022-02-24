<?php 
	session_start();
	include_once 'ajax/db_connection.php';
	$usuario = $_POST['txtUsu'];
	$contrasena = $_POST['txtPass'];
	$sentencia = $mysqli->prepare('select * from login where 
								NomUsua = ? and Password = ?;');
	$sentencia->execute([$usuario, $contrasena]);
	$datos = $sentencia->fetch(PDO::FETCH_OBJ);
	//print_r($datos);

	if ($datos === FALSE) {
		header('Location: login.php');
	}elseif($sentencia->rowCount() == 1){
		$_SESSION['nombre'] = $datos->NomUsua;
		header('Location: index.php');
	}
?>