import { Authenticate } from '../Auth/Authenticate';
import { Home } from '../Home';


export const Routes = [
    {
        component: Authenticate,
        exact: true,
        path: '/',
        protected: false,
    },
    {
        component: Home,
        exact: true,
        path: '/view',
        protected: true,
    },
];
