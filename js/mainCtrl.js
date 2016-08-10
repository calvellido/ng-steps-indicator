var app = angular.module('app', []);

app.controller('mainController', ['$scope', '$window', '$location', '$routeParams',

	function($scope, $window, $location, $routeParams) {

		/*
		 * Steps and URL managing
		 */

		//Steps indicator helper function
		//A function to check that a step is in the range of the declared steps
		$scope.parseStep = function(step) {
			var parsedStep = parseInt(step);
			if (isNaN(parsedStep) || parsedStep > parseInt($scope.steps.stepsNumber) || parsedStep < 1 || typeof(parsedStep) !== 'number') parsedStep = 1;
			return parsedStep;
		};

		//Content for the steps indicator
		var stepsDataInit = function() {
			if (!$routeParams.step) $routeParams.step = 1;
			$scope.steps = {};
			$scope.steps.stepsNumber = 3;
			$scope.steps.stepsCurrent = $scope.parseStep($routeParams.step);
			$scope.steps.stepsLegends = ['Step 1', 'Step 2', 'Step 3'];
			$location.url('/steps/' + $scope.steps.stepsCurrent);
			$window.history.replaceState({
				'step': 'firstAccess'
			}, 'steps-indicator', $location.absUrl());
		};

		// console.log('Entering this section ' + $location.url());
		// console.log($window.history.state);

		//We need to detect the onpopstate event to prevent the scope to get cleared on back button click
		$window.onpopstate = function(event) {
			if (event.state && event.state.step && event.state.step == 'firstAccess') {
				$location.url('/steps/' + $routeParams.step);
				$window.history.replaceState({
					'step': 'firstAccess'
				}, 'steps-indicator', $location.absUrl());
				//We need to call $apply since the model change is being donde outside angular context
				$scope.$apply(function() {
					$scope.steps.stepsCurrent = $routeParams.step;
				});
			}
		};

		// $scope.$on('$routeChangeStart', function(event, next, current) {
		// 	console.log('routeChange');
		// });

		//Prevent scope destroying if we aren't leaving the current state for another section on the page
		$scope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
			var oldUrlPath = oldUrl.substr(oldUrl.indexOf('#') + 1);
			var oldUrlState = oldUrlPath.substr(0, oldUrlPath.lastIndexOf('/'));
			var newUrlPath = newUrl.substr(newUrl.indexOf('#') + 1);
			var newUrlState = newUrlPath.substr(0, newUrlPath.lastIndexOf('/'));
			var newUrlSubState = newUrlPath.substr(newUrlPath.lastIndexOf('/') + 1);
			if (newUrlState == oldUrlState) {
				event.preventDefault();
				newUrlSubState = $scope.parseStep(newUrlSubState);
				if (parseInt($scope.steps.stepsCurrent) != newUrlSubState) {
					//We just change the url because the entry will be already inserted into the history stack
					$location.url('/steps/' + newUrlSubState);
					$window.history.replaceState({
						'step': newUrlSubState
					}, 'steps-indicator', $location.absUrl());
					// $scope.steps.stepsCurrent = newUrlSubState;
					//We need to call $apply since the model change is being donde outside angular context
					$scope.$apply(function() {
						$scope.steps.stepsCurrent = newUrlSubState;
					});
				}
			}
		});

		//Function that changes the URL in the address bar and add an entry to the history stack
		$scope.changeUrl = function(step) {
			var step = $scope.parseStep(step);
			if (step != $scope.steps.stepsCurrent) {
				$location.url('/steps/' + step);
				$window.history.pushState({
					'step': step
				}, 'steps-indicator', $location.absUrl());
			}
		};

		$scope.changeStep = function(stepNumber) {
			var parsedStep = $scope.parseStep(stepNumber);
			$scope.changeUrl(parsedStep);
			$scope.steps.stepsCurrent = parsedStep;
		}

		//Function that gets triggered when a step template is loaded into the observatory container
		$scope.stepLoaded = function() {
			// Only load the slider when we are on step 1
			if ($scope.steps.stepsCurrent == 1) {
				//Do something very special for step 1
			}
			else if ($scope.steps.stepsCurrent == 3) {
				//Do something very special for step 3
			}
			else {
				//Do something not so special since this step is not cool
			}
		};

		// Initialization of the needed data objects
		stepsDataInit();

}]);
