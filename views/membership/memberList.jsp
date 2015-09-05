<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div ng-controller="memberController">

<div class="panel panel-default" >
	<div class="panel-heading" >
		<div class="controls controls-row">
		<div class="input-group">
		  <span class="input-group-addon" id="srhQName">姓&nbsp;&nbsp;&nbsp;&nbsp;名:&nbsp;&nbsp;&nbsp;&nbsp;</span>
		  <input type="text" class="form-control" aria-describedby="srhQName" ng-model="qName">
		  <span class="input-group-addon" id="srhQPhone">手&nbsp;&nbsp;&nbsp;&nbsp;机:&nbsp;&nbsp;&nbsp;&nbsp;</span>
		  <input type="text" class="form-control" aria-describedby="srhQCellPhone" ng-model="qCellPhone">
		  <span class="input-group-addon" id="srhQPhone">电&nbsp;&nbsp;&nbsp;&nbsp;话:&nbsp;&nbsp;&nbsp;&nbsp;</span>
		  <input type="text" class="form-control" aria-describedby="srhQPhone" ng-model="qPhone">
		  <span class="input-group-addon" id="srhQCard">卡&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;&nbsp;&nbsp;&nbsp;</span>
		  <input type="text" class="form-control" aria-describedby="srhQCard" ng-model="qCard">
		  <span class="input-group-btn">
	        <button class="btn btn-primary" type="button" ng-click="queryMember()">查&nbsp;&nbsp;&nbsp;&nbsp;询</button>
	      </span>
		</div>
		</div>
	</div>
	<p>
	<button type="button" class="btn btn-primary " margin-top="10px" data-toggle="modal" ng-click="newMember()">新增会员</button>
	<nav class="navbar-right"></nav>
  <!-- Table -->
  <table class="table table-striped" height="90%">
  	<tr>
	    <th>姓名</th>
	    <th>性别</th>
	    <th>电话</th>
	    <th>手机</th>
	    <th>是否会员</th>
	    <th>卡号</th>
	    <th>单位</th>
	    <th>操作</th>
    </tr>
    <tr ng-repeat="user in userList">
	    <td>{{ user.name }}</td>
	    <td>{{ user.sex }}</td>
	    <td>{{ user.phone }}</td>
	    <td>{{ user.cellphone }}</td>
	    <td>{{ user.isMember }}</td>
	    <td>{{ user.cardId }}</td>
	    <td>{{ user.company }}</td>
	    <td><a href="javascript:" ng-click="getMember( user.id )">修改</a> &nbsp; 
	    	<a href="javascript:" ng-click="deleteMember(user.id)" >删除</a></td>
  	</tr>
    <!--<c:forEach var="user" items="${memberMap.rows}">
    <tr >
	    <td>${user.name}</td>
	    <td>${user.sex}</td>
	    <td>${user.phone}</td>
	    <td>${user.cellphone}</td>
	    <td>${user.cardId}</td>
	    <td><a href="javascript:" ng-click="updateUser('${user.id}')">修改</a> &nbsp; 
	    	<a href="javascript:" ng-click="deleteUser('${user.id}')" >删除</a></td>
   </tr>
   </c:forEach>-->
  </table>
  <table class="table table-striped" height="90%"  style="margin-top:10px">
    <tr >
    	<td><nav ><ul id="memberPager"></ul></nav></td>
	    <td align="right"  style="vertical-align:middle">共 【{{totalPages}}】 页      &nbsp;&nbsp;&nbsp;&nbsp; 共【{{total}}】条数据</td>
   </tr>
  </table>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新增会员</h4>
      </div>
      <form id="memberForm" data-toggle="validator"><div class="modal-body">
        <div class="input-group" style="margin-bottom:10px">
		  <span class="input-group-addon" id="srhName">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
		  <input type="text" class="form-control" id="name" name="name" ng-model="name">
		  <span class="input-group-addon" id="srhSex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
		  <!-- <input type="text" class="form-control" name="sex" ng-model="sex">-->
		  <div class="form-control">
			  <label class="radio-inline" style="width:67px"><input type="radio" name="sex" ng-model="sex" value="男">男</label>
			  <label class="radio-inline" style="width:69px"><input type="radio" name="sex" ng-model="sex" value="女">女</label>
		  </div>
		</div>
		<div class="input-group" style="margin-bottom:10px">
		  <span class="input-group-addon" id="srhBirthday">出生年月:</span>
		  <input type="date" class="form-control" name="birthday" ng-model="birthday">
		  <span class="input-group-addon" id="srhCard">电子邮箱:</span>
		  <input type="text" class="form-control" name="email" ng-model="email">
		</div>
		<div class="input-group" style="margin-bottom:10px">
		  <span class="input-group-addon" id="srhBirthday">是否会员:</span>
		  <div class="form-control">
			  <label class="radio-inline" style="width:69px"><input type="radio" name="isMember" ng-model="isMember" value="是">是</label>
			  <label class="radio-inline" style="width:69px"><input type="radio" name="isMember" ng-model="isMember" value="否">否</label>
		  </div>
		  <span class="input-group-addon" id="srhCard">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
		  <input type="text" class="form-control" name="cardId" ng-model="cardId">
		</div>
		<div class="input-group" style="margin-bottom:10px">
		  <span class="input-group-addon" id="srhCellphone">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</span>
		  <input type="text" class="form-control" name="cellphone" ng-model="cellphone">
		  <span class="input-group-addon" id="srhPhone">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话:</span>
		  <input type="text" class="form-control" name="phone" ng-model="phone">
		</div>
		<div class="input-group" style="margin-bottom:10px">
		  <span class="input-group-addon" id="srhAddress">家庭住址:</span>
		  <input type="text" class="form-control" name="address" ng-model="address">
		  <span class="input-group-addon" id="srhCompany">所在单位:</span>
		  <input type="text" class="form-control" name="company" ng-model="company">
		</div>
		<div class="input-group" style="margin-bottom:10px">
		  <span class="input-group-addon" id="srhAddress">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</span>
		  <textarea class="form-control" rows="5" id="note" name="note" ng-model="note"></textarea>
		  <input type="text" style="display:none" class="form-control" id="id" name="id" ng-model="id">
		</div>		
      </div></form>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关&nbsp;&nbsp;&nbsp;&nbsp;闭</button>
        <button type="submit" class="btn btn-primary" id="submitForm" ng-click="updateMember()">保&nbsp;&nbsp;&nbsp;&nbsp;存</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type='text/javascript'>        
        // 加此事件是为了防止在编辑时第二次打开对话框时没有数据的情况
        $('#myModal').on('hidden.bs.modal', function (event) {
        	  //reset form when the modal is hidden
        	  //this won't work, if use reset, then the form would be blank when the modal opened the seconed time
        	  //$("#memberForm").trigger("reset");
        	$(this).removeData("bs.modal");
        });
</script>

</div>