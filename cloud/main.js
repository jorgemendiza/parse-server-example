Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('newFunction', function(req, res) {
	var query_mem = new Parse.Query("TestObject");
	query_mem.find({
		success: function (objects) {
			res.success(objects);
		}, error: function (error) {
			res.error(error);
		}
	});
});

Parse.Cloud.define('getTratamientoPaciente', function(req, res) { // se debe de enviar el idUsuario(paciente)
	var pacienteId = req.params.pacienteId;
	if (pacienteId != null) {
		getUserById(pacienteId , function (paciente , error) {
			if (paciente != null) {
				var queryTrtamiento = new Parse.Query("Tratamiento");
				queryTrtamiento.equalTo("paciente", paciente);
				queryTrtamiento.find({
					success: function (tratamientos) {
						res.success(tratamientos);
					}, error: function (error) {
						res.error(error);
					}
				});
			}else{	
				res.error(error);
			}
		});
	}else{
		res.error({error:"Parametros invalidos"});
	}
});




Parse.Cloud.define('getRegistrosPaciente', function(req, res) {
	var pacienteId = req.params.pacienteId;
	if (pacienteId != null) {
		getUserById(pacienteId , function (paciente , error) {
			if (paciente != null) {
				var queryRegistros = new Parse.Query("Registro");
				queryRegistros.equalTo("paciente", paciente);
				queryRegistros.find({
					success: function (tratamientos) {
						res.success(tratamientos);
					}, error: function (error) {
						res.error(error);
					}
				});
			}else{	
				res.error(error);
			}
		});
	}else{
		res.error({error:"Parametros invalidos"});
	}
});

Parse.Cloud.define('registrarPaciente', function(req, res) {
	var especialistaId = req.params.especialistaId;
	if (especialistaId != null) {
		getUserById(especialistaId , function (especialista , error) {
			if (especialista != null) {
				var user = new Parse.User();
				user.set("email" , req.params.email);
				user.set("password" , req.params.password);
				user.set("username" , req.params.email);
				user.set("nombre" , req.params.nombre);
				user.set("apellido_paterno" , req.params.apellido_paterno);
				user.set("apellido_materno" , req.params.apellido_materno); 
				user.set("edad" , req.params.edad); 
				var arrayEspecialistas = new Array();
				arrayEspecialistas[0] = especialista;
				user.set("especialistas" , arrayEspecialistas); 
				user.set("esSpecialista" , false);
				if (req.params.sexo == 0) {
					user.set("sexo" , false);
				}else{
					user.set("sexo" , true);
				}
				user.signUp(null, {
					success: function(user) {
						res.success(user);
					},
					error: function(user, error) {
						res.error(error);
					}
				});
			}else{
				res.error(error);
			}
		});
	}else{
		res.error({error:"Parametros invalidos"});
	}
});



Parse.Cloud.define('registrarEspecialista', function(req, res) {
	
	if (request.params["nombre"] == null) {
		res.error({"error": "Parametros invalidos"});
	}

	var Especialista = Parse.Object.extend("Especialista");
	var especialista = new Especialista();	
	var user = new Parse.User();
	user.set("email" , req.params.email);
	user.set("password" , req.params.password);
	user.set("username" , req.params.email);
	user.set("nombre" , req.params.nombre);
	user.set("apellido_paterno" , req.params.apellido_paterno);
	user.set("apellido_materno" , req.params.apellido_materno); 
	user.set("edad" , req.params.edad); 
	user.set("cedula" , req.params.cedula); 
	if (req.params.especialidades != null) {
		user.set("especialidades" , req.params.especialidades);
	}
	user.set("esSpecialista" , true);
	if (req.params.sexo == 0) {
		user.set("sexo" , false);
	}else{
		user.set("sexo" , true);
	}
	user.signUp({
		success: function(user) {
			res.success(user);
		},
		error: function(error) {
			res.error("error en el signup");
		}
	});
});

function getUserById(pacienteId , callback) {
	var queryUser = new Parse.Query(Parse.User);
	queryUser.get(pacienteId , {
		success: function (paciente) {
			callback(paciente , null);
		},error: function (error) {
			callback(null , error);
		}
	});
}
