This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start mySideMenu sidemenu
```

Then, to run it, cd into `mySideMenu` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.


# Architecture

Loading screen / Splash screen
-   Inital screen when openning app
-   see, https://ionicframework.com/docs/cli/cordova/resources/
-   Ionic cli will generate the splash screen and icon, as long as the assets are there

Onboarding
-   see, Zeplin; https://app.zeplin.io/project/596e352367801b2ee5adb65d/dashboard
-   Only one screen shown
-   A variable is set and saved in local storage to determine if user has accessed app

Login
-   Sign in should be good, you can sign in - need messaging for success
-   Subviews
    -   new account (no mocks)
        -   now just basic info & password
        -   needs address added
    -   forgot password, needed (no mocks)

Sidebar Menu
-   Need to check what sections are needed.  The only certain ones that I am aware of are:
    -   Our Story
    -   Our Food
    -   My Account, see subpages listed in Zeplin side menu mock (no mocks)
-   I assume, login, social links and terms would be present not sure about others; e.g., blog
-   see, https://ionicframework.com/docs/2.0.0/api/components/menu/Menu/


Home Menu
-   Main menu categories, built out
-   Featured menu items needs to be built
    -   need to determine what's featured and what is not
-   View bag button at bottom should update with the bag items

SubMenu
-   Mostly built out
-   Needs to get menu item photos from wordpress
-   quick add


Menu Item
-   Modify selection of optional items to allow for selecting a single item multiple times, e.g., select three veggie patties for a burger

Bag
-   Need to add the images
-   Need to add the edit function
-   Builds an array of lineItems for the menu
-   Checkout button should trigger the checkout flow, which should begin with getting the next available pickup time

Checkout
-   The fields at the bottom should be auto populated if user exists
-   The best thing I think is to use Ionic Items and use a modal, or an alert box with an input ; see,  https://ionicframework.com/docs/api/components/item/Item/

Confirmation

My Account??
