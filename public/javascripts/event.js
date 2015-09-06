var mainModule = angular.module('mainModule');

mainModule.controller('eventController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
	// show the new event dialog
    $scope.newEvent = function (){
    	var dataQuery;
        var con = {};
        var hasCon = false;
        if($scope.qName){
            con["name"] = $scope.qName;
            hasCon = true;
        }
        if($scope.qCellPhone){
            con["cellphone"] = $scope.qCellPhone;
            hasCon = true;
        }
        if($scope.qCard){
            con["cardId"] = $scope.qCard;
            hasCon = true;
        }
    	if(hasCon){
    		dataQuery = {"conditions":con};
    		var req = {
       			method:'POST',
        		url: './membership/listMembersWithoutPage',
        		data: dataQuery
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
            $scope.birthday=new Date(memberInfo.birthday);
    	}
    	$scope.memberId=memberInfo._id;
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
    	$http.get("./events/"+id)
        .success(function(data, status, headers, config) {
        	$('#eventModal').modal();
        	var eventData = data;
        	var memberData = data.memberId;
        	if(memberData.birthday){
                $scope.birthday=new Date(memberInfo.birthday);
        	}
        	if(eventData.attendDate){
                $scope.attendDate=new Date(eventData.attendDate);
        	}
        	$scope.id= eventData._id;
        	$scope.donate= eventData.donate;
        	$scope.memberId= memberData._id;
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
         if($scope.id){
            $.ajax({
                type: "PUT",
                url: "./events/" + $scope.id,
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
         }
         else{
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
         }
	     
    };
	
	// delete event
    $scope.deleteEvent = function (id) {
    	if(!confirm("确定要删除活动信息吗?")){
    		return;
    	}
    	var req = {
    			 method: 'DELETE',
    			 url: './events/'+id,
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
    	var dataQuery;
        if($scope.qDate){
            dataQuery = {"pager":{"num":1}, "attendDate":$scope.qDate};
        }
        else{
            dataQuery = {"pager":{"num":1}};
        }
    	$scope.refreshEventTable(dataQuery);
    };
}]);