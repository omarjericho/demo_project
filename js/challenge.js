var app = angular.module("ChallengeApp", ['ngResource']);

app.controller("challengeCtrl", function ($scope, $resource){
	 
    var Apps_list = $resource('http://151.236.221.191:7000/apps/:id', {id : "@id"}, {
        'update': { 
            method:'PUT' 
        }
    });
    var Single_app = $resource('http://151.236.221.191:7000/app/:id', {id : "@id"}, {
        'update': { 
            method:'PUT' 
        }
    });

    $scope.apps = Apps_list.query();
    $scope.editable = false;

    $scope.removeApp = function(){
        var id = this.app.id;
        Single_app.delete({id : id},function(){
            $('#app_'+ id).fadeOut();
        });
    };

    $scope.addApp = function(){
        var added = Apps_list.save($scope.newApp, function(){
            $scope.apps.push(added);
        });
    }

    $scope.showupdate = function(app){
        $scope.editable = true;
        $scope.editable_values = app;
    }

    $scope.updateApp = function(){
        var id = $scope.editable_values.id;
        Single_app.update({id : id}, $scope.editable_values, function(){
            $scope.editable = false;
        });
    }

    $scope.choices = ['true','false'];
    $scope.sortProperty = '';
    $scope.reverseSort = false;

    $scope.sort = function(prop) {
    	$scope.sortProperty = prop;
    	$scope.reverseSort = !$scope.reverseSort;
    }
})