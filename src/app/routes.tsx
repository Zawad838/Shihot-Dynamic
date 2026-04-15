import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AccountPage } from './pages/AccountPage';
import { CreateListingPage } from './pages/CreateListingPage';
import { CheckoutPage } from './pages/CheckoutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/product/:id',
    Component: ProductDetailPage,
  },
  {
    path: '/signup',
    Component: SignUpPage,
  },
  {
    path: '/signin',
    Component: SignInPage,
  },
  {
    path: '/search',
    Component: SearchResultsPage,
  },
  {
    path: '/account',
    Component: AccountPage,
  },
  {
    path: '/sell',
    Component: CreateListingPage,
  },
  {
    path: '/checkout',
    Component: CheckoutPage,
  },
]);
