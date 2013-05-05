(function () {
  // Default local version.
  var path = '../libs/jquery/1.9.1/jquery-1.9.1.js';

  // Get any jquery=x.x.x param from the query string.
  var jqversion = location.search.match(/[?&]jquery=(.*?)(?=&|$)/);
  if (jqversion) {
    path = 'http://code.jquery.com/jquery-' + jqversion[1] + '.js';
  }
  document.write('<script src="' + path + '"></script>');
}());
