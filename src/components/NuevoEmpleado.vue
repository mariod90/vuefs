<template>
  <div id="nuevo-empleado">
    <h3>Nuevo Empleado</h3>
    <div class="row">
      <form @submit.prevent="crearEmpleado" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="empleado_id" required>
            <label for>ID Empleado</label>
          </div>
          <div class="input-field col s12">
            <input type="text" v-model="nombre" required>
            <label for>Nombre</label>
          </div>
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
            <label for>Departamento</label>
          </div>
          <div class="input-field col s12">
            <input type="text" v-model="puesto" required>
            <label for>Puesto</label>
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
  name: "nuevo-empleado",
  data() {
    return {
      empleado_id: null,
      nombre: null,
      dept: null,
      puesto: null
    };
  },
  methods: {
    crearEmpleado() {
      db.collection("empleados")
        .add({
          empleado_id: this.empleado_id,
          nombre: this.nombre,
          dept: this.dept,
          puesto: this.puesto
        })
        .then(docRef => this.$router.push("/"))
        .catch(error => console.log(err))
    }
  }
};
</script>

<style>
</style>


