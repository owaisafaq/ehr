angular.module('ui.bootstrap.pagination', [])

.constant('paginationConfig', {
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last'
})

.directive('pagination', ['paginationConfig', function(paginationConfig) {
  return {
    restrict: 'EA',
    scope: {
      numPages: '=', 
      todos: '=',
      currentPage: '=',
      filteredTodos: '=',
      control: '=',
      maxSize: '=',
      endPage: '=',
      beginPage: '=',
      pageSize: '=',
      numPerPage: '=',
      onSelectPage: '&'
    },
    template: "<div class=\"pagination\"><ul>\n" +
    "  <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\"><a ng-click=\"selectPage(page.number);changevalue(page.number);\">{{page.text}}</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "",
    replace: true,
    link: function(scope, element, attrs) {

      scope.internalControl = scope.control || {};
      scope.internalControl.changePagination = function(page,data,n,nums) {
        scope.numPerPage = nums;
        if(n < 1 && n > 0)
        {
          n = 1;
        }
        scope.numPages = n;
        //scope.internalControl.takenTablets += 1;  
          scope.todos = data;
         if ( /*! scope.isActive(page) &&*/ page > 0 && page <= scope.numPages) {
          scope.currentPage = page;
          scope.filteredTodos = [];
          var begin = ((scope.currentPage - 1) * scope.numPerPage)
          , end = begin + scope.numPerPage;

          scope.filteredTodos = scope.todos.slice(begin, end);

          scope.beginPage = (((scope.currentPage - 1) * scope.numPerPage)+1);
          scope.endPage = (scope.beginPage + scope.numPerPage) - 1;

          if(scope.endPage > scope.todos.length)
          {
            scope.endPage = scope.todos.length; 
          }


          scope.onSelectPage({ page: page });
        }
        else
        {
          scope.filteredTodos = [];
          //scope.beginPage = (((scope.currentPage - 1) * scope.numPerPage)+1);
          //scope.endPage = (scope.beginPage + scope.numPerPage) - 1;          
        }
      }
      // Setup configuration parameters
      var boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
      var directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
      var firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : paginationConfig.firstText;
      var previousText = angular.isDefined(attrs.previousText) ? attrs.previousText : paginationConfig.previousText;
      var nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : paginationConfig.nextText;
      var lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : paginationConfig.lastText;

      // Create page object used in template
      function makePage(number, text, isActive, isDisabled) {
        return {
          number: number,
          text: text,
          active: isActive,
          disabled: isDisabled
        };
      }

      scope.$watch('numPages + currentPage + maxSize + numPerPage', function() {
        scope.pages = [];
        
/*        // Default page limits
        if(isNaN(scope.numPages))
        {
          //scope.numPages = scope.pageSize;
          scope.numPerPage = scope.pageSize;

          scope.currentPage = 1;
          scope.filteredTodos = [];
          var begin = ((scope.currentPage - 1) * scope.numPerPage)
          , end = begin + scope.numPerPage;

          scope.filteredTodos = scope.todos.slice(begin, end);

          scope.beginPage = (((scope.currentPage - 1) * scope.numPerPage)+1);
          scope.endPage = (scope.beginPage + scope.numPerPage) - 1;

        }*/
        var startPage = 1, endPage = scope.numPages;

        // recompute if maxSize
        if ( scope.maxSize && scope.maxSize < scope.numPages ) {
          startPage = Math.max(scope.currentPage - Math.floor(scope.maxSize/2), 1);
          endPage   = startPage + scope.maxSize - 1;

          // Adjust if limit is exceeded
          if (endPage > scope.numPages) {
            endPage   = scope.numPages;
            startPage = endPage - scope.maxSize + 1;
          }
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
          var page = makePage(number, number, scope.isActive(number), false);
          scope.pages.push(page);
        }

        // Add previous & next links
        if (directionLinks) {
          var previousPage = makePage(scope.currentPage - 1, previousText, false, scope.noPrevious());
          scope.pages.unshift(previousPage);

          var nextPage = makePage(scope.currentPage + 1, nextText, false, scope.noNext());
          scope.pages.push(nextPage);
        }

        // Add first & last links
        if (boundaryLinks) {
          var firstPage = makePage(1, firstText, false, scope.noPrevious());
          scope.pages.unshift(firstPage);

          var lastPage = makePage(scope.numPages, lastText, false, scope.noNext());
          scope.pages.push(lastPage);
        }


        if ( scope.currentPage > scope.numPages ) {
          scope.selectPage(scope.numPages);
        }
      });
      scope.noPrevious = function() {
        return scope.currentPage === 1;
      };
      scope.noNext = function() {
        return scope.currentPage === scope.numPages || scope.currentPage > scope.numPages;
      };
      scope.isActive = function(page) {
        return scope.currentPage === page;
      };





      scope.selectPage = function(page) {
        if ( ! scope.isActive(page) && page > 0 && page <= scope.numPages) {
          scope.currentPage = page;
          scope.filteredTodos = [];
          var begin = ((scope.currentPage - 1) * scope.numPerPage)
          , end = begin + scope.numPerPage;

          scope.filteredTodos = scope.todos.slice(begin, end);

          scope.beginPage = (((scope.currentPage - 1) * scope.numPerPage)+1);
          scope.endPage = (scope.beginPage + scope.numPerPage) - 1;

          if(scope.endPage > scope.todos.length)
          {
            scope.endPage = scope.todos.length; 
          }
          


          scope.onSelectPage({ page: page });
        }
      };
    }
  };
}]);