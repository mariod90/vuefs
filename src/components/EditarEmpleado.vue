<template>
  <div id="editar-empleado">
    <h3>Editar Empleado</h3>
    <div class="row">
      <form @submit.prevent="actualizarEmpleado" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="empleado_id" required disabled>
          </div>
          <div class="input-field col s12">
            <input type="text" v-model="nombre" required placeholder="Nombre">
          </div>
          <div class="input-field col s12">
            <input type="text" v-model="dept" required placeholder="Departamento">
          </div>
          <div class="input-field col s12">
            <input type="text" v-model="puesto" required placeholder="Puesto">
          </div>
        </div>
        <button type="submit" class="btn">Enviar</button>
        <router-link to="/" class="btn grey">Cancelar</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "editar-empleado",
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
    actualizarEmpleado() {
      db.collection("empleados")
        .where("empleado_id", "==", this.$route.params.empleado_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              empleado_id: this.empleado_id,
              nombre: this.nombre,
              dept: this.dept,
              puesto: this.puesto
            }).then(()=>{
              this.$router.push({name:"vista-empleado", params:{empleado_id: this.empleado_id}})
            })
          });
        });
    }
  }
};
</script>

<style>
</style>


