var args=new Array(
        "/stylesheets/bootstrap/css/bootstrap.min.css",
        "/javascripts/jquery/jquery-1.11.3.min.js",
        "/javascripts/angular/angular.js",
        "/stylesheets/bootstrap/js/bootstrap.min.js",
        "/javascripts/bootstrap-paginator.min.js",
        "/javascripts/mainModule.js",      
        "/javascripts/membership.js",      
        "/javascripts/event.js"
        );

importDoc(args);
function importDoc(arguments){ 
    for(var i=0;i<arguments.length;i++){ 
		var file = arguments[i]; 
		
		if (file.match(/.*\.js$/)){
           document.write('<script type="text/javascript" src="' + file + '"></script>'); 
		}
        else if(file.match(/.*\.css$/)){
           document.write('<link rel="stylesheet" href="'+file+'" type="text/css" />');
		}
    }
}


//js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}

