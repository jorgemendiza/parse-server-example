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