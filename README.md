# ng-steps-indicator
A simple Angular directive to render a step selector


This directive graphically renders a number of steps and highlights the current step
based on a binded parameter, controlling if you are navigating from a lesser or higher step, so you can fit an animation simulating transitions through steps.

This use example already includes some animations sliding the content from left or right accordingly.

Also in this example you can find how to control the URL changing, and the history managing. Meaning that you can navigate thorugh the steps setting the step number directly on the address bar, or clicking on the browser back and forward buttons.

This directive depends heavily on its styling since the way to properly calculate the needed space for each step or cell
is through the flex CSS property. See the steps indicator stylings on the CSS file to check how this is achieved.

 Some isolated scope variables could (and should) have been defined as optional, but Angular 1.08 lacks this feature.
 If you use this directive in a later Angular version you can mark variables like stepsOnchange or stepsCurrent as optional.
 You could also even set a default value for a variable such as stepsCurrent by checking its existence in the link function:
 
 `
 if (scope.stepsCurrent == undefined) {
		scope.stepsCurrent = 1;
	}
	`

 Besides that, the way of using this directive would be something like this:
 
 `
 <steps-indicator steps-number="3" steps-current="stepsCurrent" steps-legends="stepsLegends" steps-onchange="setStep"></steps-indicator>
 `

