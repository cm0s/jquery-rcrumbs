# rCrumbs ─ a respsonsive breadcrumbs [![Build Status](https://travis-ci.org/cm0s/jquery-rcrumbs.png)](https://travis-ci.org/cm0s/jquery-rcrumbs)

rCrumbs aka responsiveCrumbs aka resizableCrumbs is a jQuery plugin which transforms a bunch of list item elements into
a responsive breadcrumbs. The number of navigation items displayed is dynamically adapted depending on the available
space in the browser window.

## Demo
A demonstration is available [here](http://cm0s.github.io/jquery-rcrumbs/demo/)

## Download
The plugin's javascript and css files can be found in the dist/ folder.
A development and a production version (minified) are available.

## Usage
1. Include the plugin css file:
```html
<link rel="stylesheet" type="text/css" href="jquery.rcrumbs.css">
```

2. Include jQuery and the plugin on your page:
```html
<script src="jquery.js"></script>
<script src="jquery.rcrumbs.js"></script>
```

3. Add your breadcrumbs elements using the following structure :
```html
    <div class="rcrumbs" id="breadcrumbs">
        <ul>
            <li><a href="#">Home</a><span class="divider">></span></li>
            <li><a href="#">...</a><span class="divider">></span></li>
            <li><a href="#">...</a><span class="divider">></span></li>
        </ul>
    </div>
```

4. Initialize the plugin:
```html
    <script type="text/javascript">
        jQuery(document).ready(function() {
            $("#breadcrumbs").rcrumbs();
        });
    </script>
```

## Options
A few options are available to interact with the rCrumbs plugin.

### Callbacks
A few callbacks are available to run custom function during plugin execution.

- **preCrumbsListDisplay**: Run a custom function before the crumbs list is rendered.
- **preCrumbDisplay**: Run a custom function before each crumb is rendered.
- **postCrumbsListDisplay**: Run a custom function after the crumbs list is rendered.
- **postCrumbDisplay**: Run a custom function after each crumb is rendered.

Usage example :
```html
    $("#breadcrumbs").rcrumbs({
        callback: {
            preCrumbsListDisplay: function () {
             //your code
            }
        }
    });
```

### Ellipsis
It's possible to activate/deactivate ellipsis when the last navigation element remains with not enough space to be fully
displayed.

Default option value: true

Usage example :
```html
    $("#breadcrumbs").rcrumbs({ellipsis: false});
```
### Resize on browser window resize event
Activate an automatic bind to the window resize event in order to resize the breadcrumbs when the browser window is
resized.

Default option value: true

Usage example :
```html
    $("#breadcrumbs").rcrumbs({windowResize: true});
```

### Number of uncollapsable navigation elements
The number of navigation elements which cannot be collapsed when the breadcrumbs is resized.

Default option value: 2

Usage example :
```html
    $("#breadcrumbs").rcrumbs({nbUncollapsableCrumbs: 3});

### Animation (windowResize option must be set to tue)
An animation can be activated when the crumbs are displayed/hidden on a window resize. It's also possible to set the
animation speed (in ms).

Default option value: animation:true, speed:400

Usage example :
```html
    $("#breadcrumbs").rcrumbs({
        animation: {
            activated: true, speed: 200
        }
    });
```

## Repository structure
- **demo/** ─ plugin demonstration files
- **dist/** ─ files compiled with the different Grunt tasks goes here
- **libs/** ─ project dependencies
- **src/** ─ all sources files are located here
    * **less** ─ stylesheets source files
    * **jquery.rcrumbs.js** ─ project jquery plugin source file
- **test/** ─ files used to perform unit test
- **.gitignore** ─ file used to avoid committing certain files
- **Gruntfile.js** ─ file where all Grunt tasks are declared
- **LICENSE-MIT** ─ project licence
- **package.json** ─ nodejs package description (needed by Grunt)
- **README.md** ─ <-- your are here

## jQuery requirement
jQuery 1.7.0+ or 2.0.0+

## Browser compatibility
The plugin has been tested on the following browser versions and above. It may works with certain older versions which
have not yet been tested.

- Chrome 14+
- Firefox 3.6+
- Safari Windows & OSX 4+
- IE 8+ (not compatible with IE 6,7)
- Opera 12.10+

## Contributing

From simple typo corrections to new features, your contributions are always welcome.
Please follow the next steps to submit your modifications.

- Install git ([more info](https://help.github.com/articles/set-up-git)).
- Fork this project and perform a *git clone* of your forked repository ([more info]
(https://help.github.com/articles/fork-a-repo)).
- Apply your modifications.
- Add unit test when it's relevant.
- Test the code using the project Grunt tasks.
- Update README (if needed).
- Commit your modifications with a meaningful message.
- Push your commit ([more info](https://help.github.com/articles/fork-a-repo#push-commits)).
- Issue a pull request ([more info](https://help.github.com/articles/using-pull-requests)).

### Use Grunt tasks

This project use [Grunt JS](http://gruntjs.com/) to automate the creation of the distributions files.
To use the Grunt tasks declared inside Gruntfile.js you can follow the
[getting start guide](http://gruntjs.com/getting-started).

Once Nodejs and Grunt are installed run the following command in order to download the dependencies :
```
    npm install
```

Then, your can start to use the different Grunt tasks declared inside Gruntfile.js.

### Unit testing

Unit testing is performed with the use of the [QUnit library](http://qunitjs.com).

Unit test are located into the test/test.js file. This file is loaded by the test.html file which contains the needed
fixtures to run test on concrete data.

Some other unit tests needs to be run inside a popup window in order to test the effects of a window resize. For this
reason all tests which needs to perform a window resize are located into the test/window-resize.js file and must be run
manually.

To run a test suit just open the corresponding .html test files or use the Grunt watch task. You can also run the grunt
test tasks declared in Gruntfile.js.

### Thanks
I wish to thanks all guys working on the awesome projects which are used to create/run/build this plugin.