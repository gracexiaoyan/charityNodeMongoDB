var mainModule = angular.module('mainModule',[]);

mainModule.controller('changeLink', ['$scope', '$http', function($scope, $http) {
	$scope.userShowTemplateUrl = "./events/showListEvents"; 
	
	// refresh event table
    $scope.refreshEventTable = function(queryData) {
    	var req = {
    			 method:'POST',
     			 url: './events/listEvents',
     			 data: queryData
     		};
      	$http(req).then(function(response) { 
      			$scope.eventList = response.data.rows;
      			$scope.currentPage = response.data.pager.num;
      			$scope.totalPages = response.data.pager.count;
      			$scope.total = response.data.total;
      			$scope.amount = response.data.amount;
      			if($scope.totalPages == 0){
      				$scope.currentPage = 1;
      				$scope.totalPages = 1;
      			}
      			var options = {
    		        	bootstrapMajorVersion:3,
    		            currentPage: queryData.pager.num,
    		            numberOfPages: 10,
    		            totalPages: $scope.totalPages,
    		            onPageClicked: function (event, originalEvent, type, page) {
    		            	dataQuery = {"pager":{"num":page}};
    		              $scope.refreshMemberTable(dataQuery);
    		            }
    		        };
      			
      			$('#eventPager').bootstrapPaginator(options);
   	        }, function(response) {
   	        	alert("获取活动信息失败。");
   	      });
    };
    dataQuery = {"pager":{"num":1}};
  	$scope.refreshEventTable(dataQuery);
    
	// refresh member table
    $scope.refreshMemberTable = function(queryData) {
    	var req = {
    			 method:'POST',
     			 url: './membership/listMembers',
     			 data: queryData
     		};
      	$http(req).then(function(response) { 
          //alert(JSON.stringify(response.data.rows[0]));
      			$scope.userList = response.data.rows;
      			$scope.currentPage = response.data.pager.num;
      			$scope.totalPages = response.data.pager.count;
      			$scope.total = response.data.total;
      			
      			var options = {
    		        	bootstrapMajorVersion:3,
    		            currentPage: queryData.pager.num,
    		            numberOfPages: 10,
    		            totalPages: $scope.totalPages,
    		            onPageClicked: function (event, originalEvent, type, page) {
    		            	dataQuery = {"pager":{"num":page}};
    		              	$scope.refreshMemberTable(dataQuery);
    		            }
    		        };
      			
      			$('#memberPager').bootstrapPaginator(options);
   	        }, function(response) {
   	        	alert("获取会员失败。");
   	      });
    };

	// change link when click the head
    $scope.showMember = function () {
        $("#liEvent").removeClass("active");
        $("#liMember").addClass("active");
        $scope.userShowTemplateUrl = "./membership/showListMembers";
        dataQuery = {"pager":{"num":1}};
      	$scope.refreshMemberTable(dataQuery);
    };
        
    $scope.showEvent = function () {
        $("#liMember").removeClass("active");
        $("#liEvent").addClass("active");
        $scope.userShowTemplateUrl = "./events/showListEvents";
        dataQuery = {"pager":{"num":1}};
      	$scope.refreshEventTable(dataQuery);
    };    
    
}]);

