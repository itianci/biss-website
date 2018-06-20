/**
 *
 * @配置理由按需加载
 * @example
 * ---------------
 * 按需加载
 * asyncComponent(() => import('../pages/login/login'))、
 * ---------------------------
 * 常规加载
 * import Login from '../pages/login/login'
 */
import asyncComponent from "./AsyncComponent";


const AsyncLogin = asyncComponent(() => import('../pages/login/login'))
const AsyncRegister = asyncComponent(() => import('../pages/register/register'))
const AsyncRegisterEmail = asyncComponent(() => import('../pages/register/register_email'))
const AsyncForgotPassword = asyncComponent(() => import('../pages/forgotPassword/forgotPassword'))
const AsyncFoundPassword = asyncComponent(() => import('../pages/foundPassword/foundPassword'))

//对外导出路由配置
export default [
    {
        path: '/',
        name: 'Login',
        component: AsyncLogin
    },
    {
        path: '/login',
        name: 'Login',
        component: AsyncLogin
    },
    {
        path: '/register',
        name: 'Register',
        component: AsyncRegister
    },
    {
        path: '/registeremail',
        name: 'RegisterEmail',
        component: AsyncRegisterEmail
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: AsyncForgotPassword
    },
    {
        path: '/foundpassword',
        name: 'FoundPassword',
        component: AsyncFoundPassword
    },
]