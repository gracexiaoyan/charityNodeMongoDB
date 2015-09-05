var mainModule = angular.module('mainModule');

mainModule.controller('eventController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
	// show the new event dialog
    $scope.newEvent = function (){
    	var queryCondition = [];
    	var dataQuery;
    	if($scope.qName){
    		queryCondition.push({"propertyKey" : "name", "propertyExpression" : "like", "propertyValue" : $scope.qName});
    	}
    	if($scope.qPhone){
    		queryCondition.push({"propertyKey" : "cellphone", "propertyExpression" : "like", "propertyValue" : $scope.qPhone});
    	}
    	if($scope.qCard){
    		queryCondition.push({"propertyKey" : "cardId", "propertyExpression" : "like", "propertyValue" : $scope.qCard});
    	}
    	if(queryCondition.length > 0){
    		dataQuery = {"conditions":queryCondition};
    		var req = {
       			method:'POST',
        		url: './membership/listAllMembers',
        		data: queryCondition
        	};
         	$http(req).then(function(response) {
      	        	if(response.data.length == 0){
      	        		alert("没有找到该会员，请确认该人员是否是会员。");
      	        	}
      	        	else if(response.data.length == 1){
      	        		$scope.registerMember(response.data[0]);
      	        	}
      	        	else{
      	        		$('#memberEventModal').modal();
      	        		$scope.memberEventList = response.data;
      	        	}
      	        }, function(response) {
      	        	alert("获取会员失败。");
      	      });
    	}
    	else{
    		alert("请输入查找会员条件后再注册。");
    		return;
    	}
    };
    
    $scope.registerMember = function (memberInfo){
    	$('#memberEventModal').modal('hide');
  		$('#eventModal').modal();
  		
  		$scope.attendDate=new Date();
  		if(memberInfo.birthday){
  			var dataArray = memberInfo.birthday.split("-");
			$scope.birthday=new Date(dataArray[0], dataArray[1]-1, dataArray[2]);
    	}
    	$scope.memberId=memberInfo.id;
    	$scope.name=memberInfo.name;
    	$scope.sex=memberInfo.sex;        	
    	$scope.email=memberInfo.email;
    	$scope.isMember=memberInfo.isMember;
    	$scope.cardId=memberInfo.cardId;
    	$scope.cellphone=memberInfo.cellphone;
    	$scope.phone=memberInfo.phone;
    	$scope.address=memberInfo.address;
    	$scope.company=memberInfo.company;	
    };
    
    // show the edit event dialog
    $scope.getEvent = function (id) {
    	$http.get("./events/getEvent?id="+id)
        .success(function(data, status, headers, config) {
        	if(data.length != 1){
        		alert("系统错误，请联系管理员。");
        		return;
        	}
        	$('#eventModal').modal();
        	var eventData = data[0][0];
        	var memberData = data[0][1];
        	if(memberData.birthday){
        		var dataArray = memberData.birthday.split("-");
        		$scope.birthday=new Date(dataArray[0], dataArray[1]-1, dataArray[2]);
        	}
        	if(eventData.attendDate){
        		var dataArray = eventData.attendDate.split("-");
        		$scope.attendDate=new Date(dataArray[0], dataArray[1]-1, dataArray[2]);
        	}
        	$scope.id= eventData.id;
        	$scope.donate= eventData.donate;
        	$scope.memberId= memberData.id;
        	$scope.name=memberData.name;
        	$scope.sex=memberData.sex;        	
        	$scope.email=memberData.email;
        	$scope.isMember=memberData.isMember;
        	$scope.cardId=memberData.cardId;
        	$scope.cellphone=memberData.cellphone;
        	$scope.phone=memberData.phone;
        	$scope.address=memberData.address;
        	$scope.company=memberData.company;
        }).
        error(function(data, status, headers, config) {
        	alert("系统错误，请联系管理员。");
        });
        
    };
    
    // add or update event
    $scope.updateEvent = function(){
    	if(!$('#donate')){
			 alert("请填写经费。");
			 return;
		 }
	     $.ajax({
	     	type: "POST",
	 		url: "./events/addEvent",
	 		data: $('#eventForm').serialize(),
	 		success: function(msg){
	 			if(msg=="success"){
	 				alert("保存活动信息成功。");        	 				
	 				$("#eventModal").modal('hide');   
	 				$scope.queryEvent();
	 			}
	 			else{
	 				alert("保存活动信息失败。");
	 			}
	        },
	 		error: function(jqXHR, textStatus, errorThrown){
	 			alert("保存活动信息失败。");
	 		}
	       });
    };
	
	// delete event
    $scope.deleteEvent = function (id) {
    	if(!confirm("确定要删除活动信息吗?")){
    		return;
    	}
    	var req = {
    			 method: 'POST',
    			 url: './events/deleteEvent?id='+id,
    			 headers: {
    			   'Accept': 'text/plain'
    			 }
    		};
    	$http(req).then(function(response) {
	        	alert("删除活动信息成功。");
	        	$scope.queryEvent();
	        }, function(response) {
	        	alert("删除活动信息失败。");
	      });
    };
    
    $scope.queryEvent = function() {
    	var queryCondition = [];
    	var dataQuery;
    	if($scope.qName){
    		queryCondition.push({"propertyKey" : "m.name", "propertyExpression" : "like", "propertyValue" : $scope.qName});
    	}
    	if($scope.qPhone){
    		queryCondition.push({"propertyKey" : "m.cellphone", "propertyExpression" : "like", "propertyValue" : $scope.qPhone});
    	}
    	if($scope.qCard){
    		queryCondition.push({"propertyKey" : "m.cardId", "propertyExpression" : "like", "propertyValue" : $scope.qCard});
    	}
    	if($scope.qDate){
    		queryCondition.push({"propertyKey" : "e.attendDate", "propertyExpression" : "like", "propertyValue" : $filter('date')($scope.qDate, 'yyyy-MM-dd')});
    	}
    	if(queryCondition.length > 0){
    		dataQuery = {"pager":{"num":1}, "conditions":queryCondition};
    	}
    	else{
    		dataQuery = {"pager":{"num":1}};
    	}
    	$scope.refreshEventTable(dataQuery);
    };
}]);