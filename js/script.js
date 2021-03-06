// Add Record
function addRecord() {
    // get values
   var TipoDocu = $("#TipoDocu").val();
    var NumeUsua = $("#NumeUsua").val();
    var Nombre1 = $("#Nombre1").val();
    var Nombre2 = $("#Nombre2").val();
    var Apellido1 = $("#Apellido1").val();
    var Apellido2 = $("#Apellido2").val();
    var Genero = $("#Genero").val();
    var IdDep = $("#IdDepa").val();
    var IdMuni = $("#IdMuni").val();

    // Add record
    $.post("ajax/addRecord.php", {
            TipoDocu: TipoDocu,
            NumeUsua: NumeUsua,
            Nombre1: Nombre1,
            Nombre2: Nombre2,
            Apellido1: Apellido1,
            Apellido2: Apellido2,
            Genero: Genero,
            IdDep: IdDep,
            IdMuni: IdMuni
    }, function (data, status) {
        // close the popup
        $("#add_new_record_modal").modal("hide");

        // read records again
        readRecords();

        // clear fields from the popup
        $("##TipoDocu").val("");
        $("#NumeUsua").val("");
        $("Nombre1").val("");
        $("Nombre2").val("");
        $("#Apellido1").val("");
        $("#Apellido2").val("");
        $("#Genero").val("");
        $("#IdDepa").val("");
        $("#IdMuni").val("");
    });
}

// READ records
function readRecords() {
    $.get("ajax/readRecord.php", {}, function (data, status) {
        $("#records_content").html(data);
    });
}


function DeleteUser(id) {
    var conf = confirm("¿Está seguro, realmente desea eliminar el registro?");
    if (conf == true) {
        $.post("ajax/deleteUser.php", {
                id: id
            },
            function (data, status) {
                // reload Users by using readRecords();
                //readRecords();
            }
        );
    }
}

function GetUserDetails(id) {
    // Add User ID to the hidden field for furture usage
    $("#hidden_user_id").val(id);
    $.post("ajax/readUserDetails.php", {
            id: id
        },
        function (data, status) {
            // PARSE json data
            var user = JSON.parse(data);
            // Assing existing values to the modal popup fields
            $("#update_idalumno").val(user.idalumno);
            $("#update_codalumno").val(user.codalumno);
            $("#update_obs").val(user.obs);
        }
    );
    // Open modal popup
    $("#update_user_modal").modal("show");
}

function UpdateUserDetails() {
    // get values
    var TipoDocu = $("#TipoDocu").val();
    var NumeUsua = $("#NumeUsua").val();
    var Nombre1 = $("#Nombre1").val();
    var Nombre2 = $("#Nombre2").val();
    var Apellido1 = $("#Apellido1").val();
    var Apellido2 = $("#Apellido2").val();
    var Genero = $("#Genero").val();
    var IdDep = $("#IdDepa").val();
    var IdMuni = $("#IdMuni").val();

    // get hidden field value
    var id = $("#hidden_user_id").val();

    // Update the details by requesting to the server using ajax
    $.post("ajax/updateUserDetails.php", {
            id: id,
            TipoDocu: TipoDocu,
            NumeUsua: NumeUsua,
            Nombre1: Nombre1,
            Nombre2: Nombre2,
            Apellido1: Apellido1,
            Apellido2: Apellido2,
            Genero: Genero,
            IdDep: IdDep,
            IdMuni: IdMuni
        
        },
        function (data, status) {
            // hide modal popup
            $("#update_user_modal").modal("hide");
            // reload Users by using readRecords();
            readRecords();
        }
    );
}

$(document).ready(function () {
    // READ recods on page load
    readRecords(); // calling function
});