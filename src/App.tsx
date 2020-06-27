import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Routes, AuthRoute } from './routes';
import { AuthProvider } from './context/auth';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <ToastProvider
        placement="bottom-center"
    >
      <Router>
                <Switch>
                    {
                        Routes.map((route: any) => {
                            const { component, exact, path } = route;
                            return route.protected ? (
                                <AuthRoute
                                    key={path}
                                    exact={exact}
                                    path={path}
                                    component={component}
                                />
                            ) 
                            : (
                                    <Route
                                        key={path}
                                        exact={exact}
                                        path={path}
                                        component={component}
                                    />
                            );
                        })
                    }
                </Switch>
            </Router>
            </ToastProvider>
            </AuthProvider>
  );
}

export default App;

