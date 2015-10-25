require('./school-select.html');
require('./school-select.css');

var datas = require('./school.js');

var app = angular.module('app', []);

app.directive('schoolselect', function($http,$templateCache,$compile,$parse) {

    var templateString;
    $http.get('school-select.html', {
        cache: $templateCache
    }).then(function(response) {
        templateString = response.data;
    })

    return {
        restrict: 'AE',
        require: '?ngModel',
        link: function(scope, element, attr, ngModel) {
            scope.datas = datas;
            scope.currentCity = "北京";
            scope.currentIndex = 0;
            var popupElement;
            element.on('focus', function() {
                if (!templateString) return;
                if (!popupElement) {
                    popupElement = $compile(templateString)(scope);
                    scope.$apply();
                    if (element.css('position') === 'static') {
                        element.css('position', 'relative');
                    }
                    element.parent().append(popupElement);
                }
                popupElement.css('display', '');
                jQuery(document).one('mousedown', function(event) {
                    if (event.target === element[0] || popupElement[0] === event.target || jQuery.contains(popupElement[0], event.target)) {
                        return;
                    }
                    popupElement.css('display', 'none');
                });
            }).on('keydown', function(event) {
                event.preventDefault();
            });

            scope.changeCurrentCity = function(city, index) {
                scope.currentCity = city;
                scope.currentIndex = index;
            };

            scope.selectSchool = function(school) {
                element.val(school);
                if (attr.ngModel) {
                    // $parse(attr.ngModel).assign(scope, school);
                    ngModel.$setViewValue(school);
                    console.log(ngModel.$viewValue);
                }
                popupElement.css('display', 'none');
            }
        }
    }
});


app.controller('mainCtrl', function($http, $templateCache) {
});

