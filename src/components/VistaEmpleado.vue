<template>
  <div id="vista-empleado">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ nombre }}</h4>
      </li>
      <li class="collection-item">ID Empleado: {{ empleado_id }}</li>
      <li class="collection-item">Departamento: {{ dept }}</li>
      <li class="collection-item">Puesto: {{ puesto }}</li>
    </ul>
    <router-link to="/" class="btn grey">Atrás</router-link>
    <button class="btn red" @click="eliminarEmpleado">Eliminar</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{name:'editar-empleado', params:{empleado_id: empleado_id}}" class="btn-floating btn-large blue">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "vista-empleado",
  data() {
    return {
      empleado_id: null,
      nombre: null,
      dept: null,
      puesto: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("empleados")
      .where("empleado_id", "==", to.params.empleado_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            (vm.empleado_id = doc.data().empleado_id),
              (vm.nombre = doc.data().nombre),
              (vm.dept = doc.data().dept),
              (vm.puesto = doc.data().puesto);
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("empleados")
        .where("empleado_id", "==", this.$route.params.empleado_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            (this.empleado_id = doc.data().empleado_id),
              (this.nombre = doc.data().nombre),
              (this.dept = doc.data().dept),
              (this.puesto = doc.data().puesto);
          });
        });
    },
    eliminarEmpleado() {
      if (confirm("Estás seguro?")) {
        db.collection("empleados")
          .where("empleado_id", "==", this.$route.params.empleado_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

<style>
</style>


