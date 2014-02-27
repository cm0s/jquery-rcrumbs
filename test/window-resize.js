/**
 * Here are the tests which need to be run in a popup window (in order to be able to check window size and change it).
 */
(function ($) {
  module('init');

  test('Test suit must be loaded in a popup window', function () {
    // This function must be run within a test in order to be able to add an error message after the #qunit-userAgent div generated
    // during the QUnit test phase.
    var testOpenedInAPopup = window.opener;
    var uglyInlineStyles = 'background-color: #EE5757;' +
      'padding: 0.5em 0 0.5em 2.5em; ' +
      'margin:0; ' +
      'font-family: Helvetica Neue Light, HelveticaNeue-Light, Helvetica Neue, Calibri, Helvetica, Arial, ' +
      'sans-serif';
    if (!testOpenedInAPopup) {
      $('<strong><p style="' + uglyInlineStyles + '">!!! Those tests need to be run inside a popup window !!!</strong> Please click' +
        ' <a class="popup-link" href="javascript:"><strong>here</strong></a> to open one</p>').insertAfter('#qunit-userAgent').find('.popup-link').on('click', function () {
          window.open(location.href, 'win', 'width=800,height=600,scrollbars=1,resizable=1');
        });
    }
    ok(testOpenedInAPopup, 'The test page must be opened in a popup window');
  });

  module('window-resize', {
    setup: function () {
      this.$element = $('#full-list');
    }
  });
  asyncTest('Decreasing window width should reduce the number of li elements displayed', function () {
    window.resizeTo(800, 600);
    this.$element.rcrumbs();

    setTimeout(function () { //Wait for the previous resize to finish
      var nbCrumbDisplayedBeforeResize = nbCrumbDisplayed();
      window.resizeBy(-200, 0);

      setTimeout(function () { //Wait for the previous resize to finish
        var nbCrumbDisplayedAfterResize = nbCrumbDisplayed();
        window.resizeTo(800, 600); //Reset popup to original dimension

        ok(nbCrumbDisplayedBeforeResize > nbCrumbDisplayedAfterResize, 'The number of li elements should be smaller after' +
          'the decrease of the window width');
        start();
      }, 500);
    }, 100);
  });

  asyncTest('Increasing window width should raise the number of li elements displayed', function () {
    window.resizeTo(400, 600);
    this.$element.rcrumbs();

    setTimeout(function () {
      var nbCrumbDisplayedBeforeResize = nbCrumbDisplayed();
      window.resizeBy(400, 0);

      setTimeout(function () {
        var nbCrumbDisplayedAfterResize = nbCrumbDisplayed();
        ok(nbCrumbDisplayedBeforeResize < nbCrumbDisplayedAfterResize, 'The number of li elements should be greater ' +
          'after the increase of the window width');
        start();
      }, 500);
    }, 100);
  });

  module('option', {
    setup: function () {
      this.$element = $('#full-list');
    }
  });

  asyncTest('windowResize:false => number of li elements displayed should not change on window resize', function () {
    window.resizeTo(600, 600);
    var that = this;

    setTimeout(function () { //Wait 100ms to ensure window is resized before retrieving width
      that.$element.rcrumbs({windowResize: false});

      setTimeout(function () { //Wait 100ms to ensure crumbs initialization is finished.
        window.resizeBy(-200, 0);
        var nbCrumbDisplayedBeforeResize = nbCrumbDisplayed();
        setTimeout(function () { //Wait 100ms to let resize animation progress (there should be no animations)
          var nbCrumbDisplayedAfterResize = nbCrumbDisplayed();
          window.resizeTo(800, 600); //Reset popup to original dimension
          equal(nbCrumbDisplayedBeforeResize, nbCrumbDisplayedAfterResize, 'The number of li elements ' +
            'displayed should stay the same');
          start();
        }, 100);
      }, 100);
    }, 100);
  });

  asyncTest('animation:true => should increase li width when window width is increased.', function () {
    window.resizeTo(600, 600);
    var that = this;

    setTimeout(function () { //Wait 100ms to ensure window is resized before retrieving width
      that.$element.rcrumbs({animation: {activated: true, speed: 200}});

      setTimeout(function () { //Wait 100ms to ensure crumbs initialization is finished.
        var $thirdLiElement = $('ul > li:nth-child(4)', this.$element);
        window.resizeBy(120, 0);

        setTimeout(function () { //Wait 50ms to let resize animation progress
          var resizedCrumbWidth = $thirdLiElement.width(); //Store width after 100ms

          setTimeout(function () {  //Wait 50 more ms to let resize animation progress further
            var resizedCrumbWidthAfterDelay = $thirdLiElement.width();
            window.resizeTo(800, 600); //Reset popup to original dimension
            ok(resizedCrumbWidthAfterDelay > resizedCrumbWidth, 'The li element width should have increase ' +
              '(after 50ms width = [' + resizedCrumbWidth + 'px], after 100 ms width = [' + resizedCrumbWidthAfterDelay + 'px])');
            start();
          }, 50);
        }, 50);
      }, 100);
    }, 100);
  });

  asyncTest('animation:true => should decrease li width when window width is decreased.', function () {
    window.resizeTo(600, 600);
    var that = this,
      $thirdLiElement = $('ul > li:nth-child(4)', this.$element);

    setTimeout(function () { //Wait 100ms to ensure window is resized before retrieving width
      that.$element.rcrumbs({animation: {activated: true, speed: 200}});

      setTimeout(function () { //Wait 100ms to ensure crumbs initialization is finished.
        var resizedCrumbWidth = $thirdLiElement.width();
        window.resizeBy(-120, 0);

        setTimeout(function () { //Wait 100ms to let resize animation progress
          var resizedCrumbWidthAfterDelay = $thirdLiElement.width();
          window.resizeTo(800, 600); //Reset popup to original dimension
          ok(resizedCrumbWidthAfterDelay < resizedCrumbWidth, 'The li element width should have decrease ' +
            '(initial width = [' + resizedCrumbWidth + 'px], after 100ms width = [' + resizedCrumbWidthAfterDelay + 'px])');
          start();
        }, 100);
      }, 100);
    }, 100);
  });

  asyncTest('animation:false => li elements should not be animated', function () {
    window.resizeTo(600, 600);
    var that = this,
      $thirdLiElement = $('ul > li:nth-child(3)', this.$element);

    setTimeout(function () { //Wait 100ms to ensure window is resized before retrieving width
      that.$element.rcrumbs({animation: {activated: false}});

      setTimeout(function () { //Wait 100ms to ensure crumbs initialization is finished.
        var resizedCrumbWidth = $thirdLiElement.width();
        window.resizeBy(-120, 0);

        setTimeout(function () { //Wait 100ms to let resize animation progress
          var resizedCrumbWidthAfterDelay = $thirdLiElement.width();
          window.resizeTo(800, 600); //Reset popup to original dimension
          equal(resizedCrumbWidthAfterDelay, resizedCrumbWidth, 'The li element width should stay the same' +
            '(initial width = [' + resizedCrumbWidth + 'px], after 100ms width = [' + resizedCrumbWidthAfterDelay + 'px])');
          start();
        }, 100);
      }, 100);
    }, 100);
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