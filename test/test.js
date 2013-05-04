/* jshint -W024 */

(function ($) {
  module('plugin', {
    setup: function () {
      this.$element = $('#full-list');
    }
  });

  test('is defined on jQuery object', function () {
    ok($.fn.rcrumbs, "Should be accessible");
  });

  test('should be chainable', function () {
    strictEqual(this.$element.rcrumbs(), this.$element, "Should return a jQuery object");
  });

  test('should not be instantiable more than once on an element', function () {
    throws(
      function () {
        this.$element.rcrumbs();
        this.$element.rcrumbs();
      },
      "Should raise an error"
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
      "Should raise an error"
    );
  });

  test('should not be possible to call private method', function () {
    throws(
      function () {
        this.$element.rcrumbs('_init');
      },
      "Should raise an error"
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
    var crumbTextOverflowValue = lastCrumb.css('text-overflow');
    equal(crumbTextOverflowValue, 'ellipsis', 'Last li element should have the following inline style: text-overflow:ellipsis');
  });

}(jQuery));