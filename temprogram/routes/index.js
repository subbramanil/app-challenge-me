exports.index=function(req,res){
	res.render('partial',{
		title:'Home',
		comment:'Team Members',
		classname:'home',
		users:['Yasmine','Adman','kelly']
	});
}

exports.about=function(req,res){
	res.render('partial',{
		title:'About US',
		classname:'About Us'
		
	});
}