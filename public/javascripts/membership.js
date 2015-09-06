var mainModule = angular.module('mainModule');

mainModule.controller('memberController', ['$scope', '$http', function($scope, $http) {
	// show the new member dialog
    $scope.newMember = function (){
    	$("#memberForm").trigger("reset");
    	$scope.sex="男";
    	$scope.isMember="否";
        $scope.id="";
    	$('#myModal').modal();    	
    };
    
    // show the edit member dialog
    $scope.getMember = function (id) {
    	$http.get("./membership/"+id)
        .success(function(data, status, headers, config) {
        	$('#myModal').modal();
        	if(data.birthday){
                $scope.birthday=new Date(data.birthday);
        	}
        	$scope.id= data._id;
        	$scope.name=data.name;
        	$scope.sex=data.sex;        	
        	$scope.email=data.email;
        	$scope.isMember=data.isMember;
        	$scope.cardId=data.cardId;
        	$scope.cellphone=data.cellphone;
        	$scope.phone=data.phone;
        	$scope.address=data.address;
        	$scope.company=data.company;
        	$scope.note=data.note;        	
        }).
        error(function(data, status, headers, config) {
        	alert("更新会员失败。");
        });
        
    };

    // add or update member
    $scope.updateMember = function(){
        if(!$('#name')){
             alert("请填写姓名。");
             return;
         }
         if($scope.id){
            $.ajax({
                type: "PUT",
                url: "./membership/" + $scope.id,
                data: $('#memberForm').serialize(),
                success: function(msg){
                    if(msg=="success"){
                        alert("保存会员成功。");                           
                        $("#myModal").modal('hide');   
                        $scope.queryMember();
                    }
                    else{
                        alert("保存会员失败。");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("保存会员失败。");
                }
            });
         }
        else{
            $.ajax({
                type: "POST",
                url: "./membership/addMember",
                data: $('#memberForm').serialize(),
                success: function(msg){
                    if(msg=="success"){
                        alert("保存会员成功。");                           
                        $("#myModal").modal('hide');   
                        $scope.queryMember();
                    }
                    else if(msg=="exist"){
                        alert("该会员已存在。");
                    }
                    else{
                        alert("保存会员失败。");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("保存会员失败。");
                }
            });
        } 
    };
	
	// delete member
    $scope.deleteMember = function (id) {
    	if(!confirm("确定要删除会员吗?")){
    		return;
    	}
    	var req = {
    			 method: 'POST',
    			 url: './membership/deleteMember?id='+id,
    			 headers: {
    			   'Accept': 'text/plain'
    			 }
    		};
    	$http(req).then(function(response) {			
	        	alert("删除会员成功。");
	        	$scope.queryMember();
	        }, function(response) {
	        	alert("删除会员失败。");
	      });
    };
    
    $scope.queryMember = function() {
    	var dataQuery;
        var con = {};
    	if($scope.qName){
            con["name"] = $scope.qName;
    	}
    	if($scope.qCellPhone){
            con["cellphone"] = $scope.qCellPhone;
    	}
    	if($scope.qPhone){
            con["phone"] = $scope.qPhone;
    	}
    	if($scope.qCard){
            con["cardId"] = $scope.qCard;
    	}
    	if(queryCondition.length > 0){
    		dataQuery = {"pager":{"num":1}, "conditions":con};
    	}
    	else{
    		dataQuery = {"pager":{"num":1}};
    	}
    	$scope.refreshMemberTable(dataQuery);
    };
}]);