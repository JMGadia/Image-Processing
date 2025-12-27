import { createRouter, createWebHistory } from 'vue-router';
import LogIn from './pages/LogIn.vue';
import SignUp from './pages/SignUp.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import ResetPassword from './pages/ResetPassword.vue';
import AdminDashboard from './pages/AdminDashboard.vue';
import UserHome from './pages/UserHome.vue';
import Inventory from './pages/inventory.vue';
import StockIn from './pages/stock-in.vue';
import StockOut from './pages/stock-out.vue';
import GcashATM from './pages/gcash-atm.vue';
import LendingList from './pages/lending-list.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUp },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password', component: ResetPassword },
  { path: '/admin-dashboard', component: AdminDashboard },
  { path: '/user-home', component: UserHome },
  { path: '/inventory', component: Inventory },
  { path: '/stock-in', component: StockIn },
  { path: '/stock-out', component: StockOut },
  { path: '/gcash-atm', component: GcashATM },
  { path: '/lending-list', component: LendingList }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const session = localStorage.getItem('userSession');
  const userData = session ? JSON.parse(session) : null;

  /**
   * 1. IMPROVED LOGOUT LOGIC
   * We remove the 'confirm()' popup.
   * If a user is on a dashboard and goes to login, we allow it.
   * Your AdminLayout.vue will handle the 'Are you sure?' part with its nice modal.
   */
  if (to.path === '/login' && session) {
    // If we are navigating to login, we just let it happen.
    // The actual removal of localStorage happens in your AdminLayout confirmLogout function.
    next();
    return;
  }

  // 2. PROTECTION LOGIC (URLs)
  const adminPaths = ['/admin-dashboard', '/inventory', '/stock-in', '/stock-out', '/gcash-atm', '/lending-list'];

  if (adminPaths.includes(to.path)) {
    if (!userData) {
      alert("Please login first.");
      return next('/login');
    }
    if (userData.role !== 'admin') {
      alert("Access Denied: Admins only.");
      return next('/user-home');
    }
  }

  if (to.path === '/user-home' && !userData) {
    alert("Please login first.");
    return next('/login');
  }

  // 3. PREVENT LOGGED-IN USERS FROM GOING TO LOGIN/SIGNUP
  if ((to.path === '/login' || to.path === '/signup') && userData) {
    if (userData.role === 'admin') return next('/admin-dashboard');
    return next('/user-home');
  }

  next();
});

export default router;