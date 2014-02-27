/* jshint -W024 */

(function ($) {
  module('plugin', {
    setup: function () {
      this.$element = $('#full-list');
    }
  });

  test('is defined on jQuery object', function () {
    ok($.fn.rcrumbs, 'Should be accessible');
  });

  test('should be chainable', function () {
    strictEqual(this.$element.rcrumbs(), this.$element, 'Should return a jQuery object');
  });

  test('should not be instantiable more than once on an element', function () {
    throws(
      function () {
        this.$element.rcrumbs();
        this.$element.rcrumbs();
      },
      'Should raise an error'
    );
  });

  module('public-method', {
    setup: function () {
      this.$element = $('#full-list');
    }
  });

  test('should not be callable when plugin not instantiated', function () {
    throws(
      function () {
        this.$element.rcrumbs('version');
      },
      'Should raise an error'
    );
  });

  test('should not be possible to call private method', function () {
    throws(
      function () {
        this.$element.rcrumbs('_init');
      },
      'Should raise an error'
    );
  });

  module('option', {
    setup: function () {
      this.$element = $('#full-list');
    }
  });

  test('callback:preCrumbsListDisplay => function is correctly called', function () {
    var nbCall = 0;

    this.$element.rcrumbs({
      callback: {
        preCrumbsListDisplay: function () {
          nbCall += 1;
        }
      }
    });
    equal(nbCall, 1, 'callback function should have been called 1 times');
  });

  test('callback:preCrumbDisplay => function is correctly called', function () {
    var nbCall = 0;

    this.$element.rcrumbs({
      callback: {
        preCrumbDisplay: function () {
          nbCall += 1;
        }
      }
    });
    equal(nbCall, 7, 'callback function should have been called 7 times');
  });

  test('callback:postCrumbsListDisplay => function is correctly called', function () {
    var nbCall = 0;

    this.$element.rcrumbs({
      callback: {
        postCrumbsListDisplay: function () {
          nbCall += 1;
        }
      }
    });
    equal(nbCall, 1, 'callback function should have been called 1 times');
  });

  test('callback:postCrumbDisplay => function is correctly called', function () {
    var nbCall = 0;

    this.$element.rcrumbs({
      callback: {
        postCrumbDisplay: function () {
          nbCall += 1;
        }
      }
    });
    equal(nbCall, 7, 'callback function should have been called 7 times');
  });

  test('callback:postCrumbDisplay => function is correctly called (animation option is activated)', function () {
    var nbCall = 0;

    this.$element.rcrumbs({
      callback: {
        postCrumbDisplay: function () {
          nbCall += 1;
        }
      },
      animation: {
        activated: true
      }
    });
    equal(nbCall, 7, 'callback function should have been called 7 times');
  });

  test('ellipsis:true => correctly set when available size smaller than last li element width', function () {
    this.$element.width(70);
    this.$element.rcrumbs();
    var lastCrumb = $('li', this.$element).last();
    equal(true, lastCrumb.hasClass('ellipsis'), 'Last li element should have the class [ellipsis]');
  });

  test('nbUncollapsableCrumbs:3 => the number of crumbs displayed is equal to two even when available space is smaller than' +
    ' the width of the two crumbs', function () {
    var $element = $('#full-list-width-100px');

    $element.rcrumbs({
      nbUncollapsableCrumbs: 3
    });
    var nbCrumbs = nbCrumbDisplayed();
    equal(nbCrumbs, 3, '[' + nbCrumbs + '] crumbs dispayed, there should be 3');
  });

  test('nbUncollapsableCrumbs:3 => ellipsis is set on the last crumb only', function () {
    var $element = $('#full-list-width-100px');

    $element.rcrumbs({
      nbUncollapsableCrumbs: 3
    });

    var $lastElement = $('li', $element).last(),
      $secondElement = $lastElement.prev(),
      $firstElement = $secondElement.prev();

    equal($firstElement.hasClass('ellipsis'), false, 'first crumb should not have ellipsis');
    equal($secondElement.hasClass('ellipsis'), false, 'second crumb should not have ellipsis');
    equal($lastElement.hasClass('ellipsis'), true, 'last crumb should have ellipsis');
  });

  test('nbFixedCrumbs:1 => the first crumb must be hidden', function () {
    var $element = $('#full-list-width-100px');

    $element.rcrumbs({
      nbFixedCrumbs: 1
    });
    var firstCrumb = $('li', $element).first();
    equal(firstCrumb.hasClass('show'), true, 'first li element should have the class [show]');
  });

  test('nbFixedCrumbs:3 => the three crumbs must be visible', function () {
    var $element = $('#full-list-width-100px');

    $element.rcrumbs({
      nbFixedCrumbs: 3
    });
    var firstCrumb = $('li', $element).first(),
      secondCrumb = $('li:nth-child(2)', $element),
      thirdCrumb = $('li:nth-child(3)', $element);
    equal(firstCrumb.hasClass('show'), true, 'first li element should have the class [show]');
    equal(secondCrumb.hasClass('show'), true, 'second li element should have the class [show]');
    equal(thirdCrumb.hasClass('show'), true, 'third li element should have the class [show]');
  });

  function nbCrumbDisplayed() {
    var nbCrumb = 0;
    $.each($('li', this.$element), function (index, value) {
      if ($(this).hasClass('show')) {
        nbCrumb += 1;
      }
    });
    return nbCrumb;
  }

}(jQuery));