import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import UpcomingMovie from './pages/UpcomingMovie';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Menu from './components/Menu/Menu';
import { useEffect, useState } from 'react';
import authService from './services/auth.service';

const App: React.FC = () => {

  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const user = authService.getUser();
    if (user) {
      setUser(user);
    }
  }, [])

  return (
    <IonApp>
      {user ?
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu setLogOut={((user: any) => setUser(user))}/>
            <IonRouterOutlet id="main">
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/upcomingmovie">
                <UpcomingMovie />
              </Route>
              {/* <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" /> */}
              {/* </Route> */}
              <Route exact path="/">
                <Redirect to="/upcomingmovie" />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
        :
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login setLogin={((user: any) => setUser(user))} />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      }
    </IonApp >
  );
}

export default App;
