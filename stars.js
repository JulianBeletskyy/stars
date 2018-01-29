angular.module('app').directive('stars', function() {
    function getTemplate() {
        var template = '';
        template += '<span style="{{mainOptions}};">';
        template +=     '<span ng-repeat="s in stars track by $index">';
        template +=         '<i class="fa fa-star {{starsSpin}}"></i>';
        template +=         '<br ng-show="starsOrientation" />';
        template +=     '</span>';
        template += '</span>';
        return template;
    };

    function link(scope, element, attrs, ctrl) {
        scope.starsSpin = attrs.starsSpin == 'true' ? 'fa-spin' : '';
        scope.starsOrientation = attrs.starsOrientation == 'vertical' ? true : false;
        
        scope.options = {
            'align': 'float:' + (attrs.starsAlign || 'none'),
            'size': 'font-size:' +  (attrs.starsSize || '16') + 'px',
            'color': 'color:' + (attrs.starsColor || '#FEA40C'),
            'padding': 'padding:' + (attrs.starsPadding || '1') + 'px',
            'white-space': 'white-space:' + (attrs.starsWrap || 'nowrap')
        };

        scope.mainOptions = ctrl.getStyle(scope.options);
        scope.stars = ctrl.getStars(attrs.stars);
    };
	return {
        restrict: 'A',
        scope: {},
        controller: ['$scope', function directiveController($scope) {
            this.getStyle = function(options) {
                var temp = [];
                for (var k in options) {
                    if (options[k] == 'color:gold') {
                        options[k] = options[k].replace('gold', '#FEA40C'); 
                    }
                    temp.push(options[k]);
                }
                return temp.join(';');
            };

            this.getStars = function(stars) {
                return new Array(stars * 1);
            }
        }],
    	link: link,
    	replace: true,
    	template: getTemplate
	}
});