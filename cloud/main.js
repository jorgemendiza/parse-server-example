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


Parse.Cloud.define('registrarEspecialista', function(request, response) {
	
	if (request.params["nombre"] == null) {
		response.error({"error": "Parametros invalidos"});
	}

	var Especialista = Parse.Object.extend("Especialista");
	var especialista = new Especialista();	
	especialista.save(request.params, {
		success: function(especialista) {
			var responseObject = new Object();
			responseObject["especialista"] = especialista;
			response.success(responseObject);
	  	},error: function(especialista, error) {
			response.error(error);
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