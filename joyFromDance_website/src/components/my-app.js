import {LitElement, html} from '@polymer/lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';
import {installOfflineWatcher} from 'pwa-helpers/network.js';
import {installRouter} from 'pwa-helpers/router.js';
import {updateMetadata} from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import {store} from '../store.js';

// These are the actions needed by this element.
import {
    navigate,
    updateOffline,
    updateDrawerState,
    updateLayout
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import {
    menuIcon,
    messageIcon,
    accountIcon,
    logoutIcon,
    backArrowIcon,
    alarmOnIcon,
    dashboardIcon,
    calendarIcon,
    meetingRoomIcon,
    groupIcon,
    notificationsIcon,
    loginIcon
} from './my-icons.js';
import './snack-bar.js';
import {SharedStyles} from './shared-styles.js';
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCTemporaryDrawer} from '@material/drawer';

// import { dashboardIcon, plusIcon } from './my-icons.js';

class MyApp extends connect(store)(LitElement) {
    _render({appTitle, _page, _drawerOpened, _snackbarOpened, _offline, _wideLayout}) {
        // Anything that's related to rendering should be done in here.
        return html`
    ${SharedStyles}
    <style>
      :host {
        --app-drawer-width: 256px;
        display: block;

        /*--app-primary-color: #E91E63;*/
        /*--app-secondary-color: #293237;*/
        /*--app-dark-text-color: var(--app-secondary-color);*/
        /*--app-light-text-color: white;*/
        /*--app-section-even-color: #f7f7f7;*/
        /*--app-section-odd-color: white;*/
        
        /*--app-header-background-color: white;*/
        /*--app-header-text-color: var(--app-dark-text-color);*/
        /*--app-header-selected-color: var(--app-primary-color);*/
        
        /*--app-drawer-background-color: var(--app-secondary-color);*/
        /*--app-drawer-text-color: var(--app-light-text-color);*/
        /*--app-drawer-selected-color: #78909C;*/
      }

      app-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
      }

      .toolbar-top {
        background-color: var(--app-header-background-color);
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .main-content {
        padding-top: 64px;
        min-height: 100vh;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        padding: 24px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      /* Wide layout */
      @media (min-width: 768px) {
        app-header,
        .main-content,
        footer {
          margin-left: var(--app-drawer-width);
        }
        .menu-btn {
          display: none;
        }

        [main-title] {
          margin-right: 0;
        }
      }
      
    </style>

    <header id="demo-top-app-bar" class="mdc-top-app-bar mdc-top-app-bar--fixed-scrolled" style="top: 0px;">
      <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <a id="menuLink" class="material-icons mdc-top-app-bar__navigation-icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" style="--mdc-ripple-fg-size:28.8px; --mdc-ripple-fg-scale:1.66667; --mdc-ripple-left:10px; --mdc-ripple-top:10px;" tabindex="-1">${menuIcon}</a>
              <span class="mdc-top-app-bar__title">Joy from dance</span>
          </section>
          <section id="iconSection" class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          </section>
      </div>
  </header>
  
    <aside class="mdc-drawer mdc-drawer--temporary">
          <nav class="mdc-drawer__drawer">
              <header class="mdc-drawer__header">
                  <div class="mdc-drawer__header-content mdc-theme--on-primary mdc-theme--primary-bg">
                  </div>
              </header>
              <nav class="mdc-drawer__content mdc-list-group">
                  <div class="mdc-list">
                      <a class="mdc-list-item" id="backMenuLink">
                          <i class="mdc-list-item__graphic" aria-hidden="true">${backArrowIcon}</i>Back
                      </a>
                  </div>
              </nav>
          </nav>
      </aside>
  

    <!-- Main content -->
    <main role="main" class="main-content">
      <sign-up class="page" active?="${_page === 'signup'}"></sign-up>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>

    <footer>
      <p>Made by <a href="https://cwsfe.pl" target="_blank" tabindex="-1">CWSFE</a> team.</p>
    </footer>

    <snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.</snack-bar>
    `;
    }

    static get properties() {
        return {
            appTitle: String,
            _page: String,
            _drawerOpened: Boolean,
            _snackbarOpened: Boolean,
            _offline: Boolean,
            _wideLayout: Boolean
        }
    }

    constructor() {
        super();
        // To force all event listeners for gestures to be passive.
        // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
        setPassiveTouchGestures(true);
    }

    _firstRendered() {
        installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
        installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
        installMediaQueryWatcher(`(min-width: 768px)`,
            (matches) => store.dispatch(updateLayout(matches)));


        var appBarEl = this.shadowRoot.getElementById('demo-top-app-bar');
        new MDCTopAppBar(appBarEl);

        var drawerEl = this.shadowRoot.querySelector('.mdc-drawer');
        var drawer = new MDCTemporaryDrawer(drawerEl);

        appBarEl.addEventListener('MDCTopAppBar:nav', function () {
            drawer.open = true;
        });
        this.shadowRoot.querySelector('#backMenuLink').addEventListener('click', function () {
            drawer.open = false;
        });
    }

    static _didRender(properties, changeList) {
        if ('_page' in changeList) {
            const pageTitle = properties.appTitle + ' - ' + changeList._page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                // This object also takes an image property, that points to an img src.
            });
        }
    }

    _stateChanged(state) {
        this._page = state.app.page;
        this._offline = state.app.offline;
        this._snackbarOpened = state.app.snackbarOpened;
        this._drawerOpened = state.app.drawerOpened;
        this._wideLayout = state.app.wideLayout;
    }
}

window.customElements.define('my-app', MyApp);
