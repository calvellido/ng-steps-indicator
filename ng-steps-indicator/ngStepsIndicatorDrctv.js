/*
 * -------------------------
 *    ng-steps-indicator
 * --------------------------
 * @jvalencia 2016
 * A directive that graphically renders a number of steps and highlights the current step
 * based on a binded parameter, controlling if you are navigating from a lesser or higher step
 * (so you can fit an animation simulating transitions through steps).
 */

/*
 * This directive depends heavily on its styling since the way to properly calculate the needed space for each step or cell
 * is through the flex CSS property. See the steps indicator stylings on the CSS file to check how this is achieved.
 *
 * Some isolated scope variables could (and should) have been defined as optional, but Angular 1.08 lacks this feature.
 * If you use this directive in a later Angular version you can mark variables like stepsOnchange or stepsCurrent as optional.
 * You could also even set a default value for a variable such as stepsCurrent by checking its existence in the link function:
 *
 * if (scope.stepsCurrent == undefined) {
 *		scope.stepsCurrent = 1;
 *	}
 *
 * Besides that, the way of using this directive is something like this:
 *
 * <steps-indicator steps-number="3" steps-current="stepsCurrent" steps-legends="stepsLegends" steps-onchange="setStep"></steps-indicator>
 *
 */

'use strict';

app.directive('ngStepsIndicator', [
	function() {
		return {
			restrict: 'AE',
			templateUrl: 'ng-steps-indicator/ngStepsIndicator.html',
			scope: {
				stepsNumber: '=', //The total number of steps that the directive will show
				stepsLegends: '=', //An array containing the text on top of the steps, one per entry is needed
				stepsOnClick: '=', //A function that will be triggered when the step is deliberately changed
				stepsCurrent: '=', //The binded variable where the current step will be observed
				stepsFromRight: '=' //This is binded in case that we want to associate some effect to this condition ( e.g. content sliding)
			},
			link: function(scope, tElem, tAttrs) {

				scope.$watch('stepsCurrent', function(newValue, oldValue) {
					if (newValue && newValue != oldValue) {
						scope.stepsFromRight = (newValue < oldValue);
						// if (typeof(scope.stepsOnchange) === 'function') {
						// 	scope.stepsOnchange(newValue);
						// }
					}
				});

				scope.clickStep = function(newStep) {
					newStep = parseInt(newStep);
					if (newStep > parseInt(scope.stepsNumber) || newStep < 1 || typeof(newStep) !== 'number') newStep = 1;
					if (newStep !== scope.stepsCurrent) {
						if (typeof(scope.stepsOnClick) === 'function') {
							scope.stepsOnClick(newStep);
						}
						scope.stepsCurrent = newStep;
					}
				};

			},
			controller: function($scope, $element, $attrs) {
				//This function is used to accordingly calculate the number of steps to draw on the template
				$scope.getNumber = function(num) {
					return new Array(parseInt(num));
				};

			}
		};
}]);
