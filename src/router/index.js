import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import NuevoEmpleado from "@/components/NuevoEmpleado";
import EditarEmpleado from "@/components/EditarEmpleado";
import VistaEmpleado from "@/components/VistaEmpleado";
import Login from "@/components/Login";
import Register from "@/components/Register";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/new",
      name: "nuevo-empleado",
      component: NuevoEmpleado,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:empleado_id",
      name: "editar-empleado",
      component: EditarEmpleado,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:empleado_id",
      name: "vista-empleado",
      component: VistaEmpleado,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

//Nav Guards
router.beforeEach((to, from, next) => {
  //Check for requireAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Check if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //Check if logged in
    if (firebase.auth().currentUser) {
      // Go to dashboard
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;