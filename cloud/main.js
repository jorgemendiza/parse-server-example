
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