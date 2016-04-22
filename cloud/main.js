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
				user.set("username", req.params.email);
				user.set("email", req.params.email);
				user.set("password", req.params.password);
				user.set("nombre", req.params.nombre);
				user.set("apellido_paterno", req.params.apellido_paterno);
				user.set("apellido_materno", req.params.apellido_materno);
				user.set("fecha_nacimiento", req.params.fecha_nacimiento);
				user.set("calle", req.params.calle);
				user.set("numero", req.params.numero);
				user.set("colonia", req.params.colonia);
				user.set("delegacion", req.params.delegacion);
				user.set("estado", req.params.estado);
				user.set("codigo_postal", req.params.codigo_postal);
				user.set("cedula", req.params.cedula);
				user.set("telefono", req.params.telefono);
				var arrayEspecialistas = new Array();
				arrayEspecialistas[0] = especialista;
				user.set("especialistas" , arrayEspecialistas); 
				user.set("esEspecialista" , false);
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
		res.error("No se ha enviado el Id del especialista.");
	}
});



Parse.Cloud.define('registrarEspecialista', function(req, res) {
	
	var user = new Parse.User();
	user.set("username", req.params.email);
	user.set("email", req.params.email);
	user.set("password", req.params.password);
	user.set("nombre", req.params.nombre);
	user.set("apellido_paterno", req.params.apellido_paterno);
	user.set("apellido_materno", req.params.apellido_materno);
	user.set("fecha_nacimiento", req.params.fecha_nacimiento);
	user.set("calle", req.params.calle);
	user.set("numero", req.params.numero);
	user.set("colonia", req.params.colonia);
	user.set("delegacion", req.params.delegacion);
	user.set("estado", req.params.estado);
	user.set("codigo_postal", req.params.codigo_postal);
	user.set("cedula", req.params.cedula);
	user.set("telefono", req.params.telefono);
	user.set("esEspecialista" , true);
	user.signUp(null, {
	  success: function(user) {
			res.success(user);
	  },
	  error: function(user, error) {
			res.error(error);	   
	  }
	});
});

function getUserById(userId , callback) { //devuelve un User ParseObject a partir de un objectId
	var queryUser = new Parse.Query(Parse.User);
	queryUser.get(userId , {
		success: function (user) {
			if (user == null) {
				callback(null , 'El usuario no existe');
			}else{
				callback(user , null);
			}
		},error: function (error) {
			callback(null , error);
		}
	});
}
