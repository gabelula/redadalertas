import React from 'react';
import {mount} from 'react-mounter';
// Import Pages
import Home from '../imports/ui/pages/Home.jsx';
import Reporta from '../imports/ui/pages/Reporta.jsx';
import Alertas from '../imports/ui/pages/Alertas.jsx';
import Comparte from '../imports/ui/pages/Comparte.jsx';
import Privacidad from '../imports/ui/pages/Privacidad.jsx';
// load Layout and Welcome React components

import Main from '../imports/ui/layouts/Main.jsx';

FlowRouter.route("/", {
  action() {
    mount(Main, {
yield: <Home />
    });
  }
});

FlowRouter.route("/reporta", {
  action() {
    mount(Main, {
			yield: <Reporta />
    });
  }
});

FlowRouter.route("/alertas", {
  action() {
    mount(Main, {
			yield: <Alertas />
    });
  }
});

FlowRouter.route("/comparte", {
  action() {
    mount(Main, {
			yield: <Comparte />
    });
  }
});

FlowRouter.route("/privacidad", {
  action() {
    mount(Main, {
			yield: <Privacidad />
    });
  }
});
