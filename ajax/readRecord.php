<?php
	// include Database connection file 
	include("db_connection.php");

	// Design initial table header 
	$data = '<table class="table table-bordered table-striped">
						<tr>
							<th>No.</th>
							<th>TipoDocu</th>
							<th>Numero</th>
							<th>Primer Nombre</th>
							<th>Segundo Nombre</th>
							<th>Primer Apellido</th>
							<th>Segundo Apellido</th>
							<th>Genero</th>
							<th>Dpto</th>
							<th>Municipio</th>
							<th></th>
							<th></th>
						</tr>';

	$query = "SELECT * FROM paciente";

	if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    // if query results contains rows then featch those rows 
    if(mysqli_num_rows($result) > 0)
    {
    	$number = 1;
    	while($row = mysqli_fetch_assoc($result))
    	{
    		$data .= '<tr>
				<td>'.$number.'</td>
				<td>'.$row['TipoDocu'].'</td>
				<td>'.$row['NumeUsua'].'</td>
				<td>'.$row['Nombre1'].'</td>
				<td>'.$row['Nombre2'].'</td>
				<td>'.$row['Apellido1'].'</td>
				<td>'.$row['Apellido2'].'</td>
				<td>'.$row['Genero'].'</td>
				<td>'.$row['IdDepa'].'</td>
				<td>'.$row['IdMuni'].'</td>
				<td>
					<button onclick="GetUserDetails('.$row['id'].')" class="btn btn-warning"><i class="fas fa-edit" data-target="#add_new_record_modal"></i></button>
					
					
				</td>
				<td>
					<button onclick="DeleteUser('.$row['id'].')" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
				</td>
    		</tr>';
    		$number++;
    	}
    }
    else
    {
    	// records now found 
    	$data .= '<tr><td colspan="6">No hay registros!</td></tr>';
    }

    $data .= '</table>';

    echo $data;
?>