import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NuevoEmpleado from '@/components/NuevoEmpleado'
import EditarEmpleado from '@/components/EditarEmpleado'
import VistaEmpleado from '@/components/VistaEmpleado'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'nuevo-empleado',
      component: NuevoEmpleado
    },
    {
      path: '/edit/:empleado_id',
      name: 'editar-empleado',
      component: EditarEmpleado
    },
    {
      path: '/:empleado_id',
      name: 'vista-empleado',
      component: VistaEmpleado
    }
  ]
})
