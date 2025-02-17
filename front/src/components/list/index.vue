<template>
  <v-row no-gutters >
    <v-col cols="12" class="header-dash d-flex align-center justify-center">
      <h3>Consulta de Alunos</h3>
    </v-col>
    <v-col cols="12">  

      <v-row no-gutters class="ma-5 align-center">
        <v-col cols="6" sm="8" md="7" justify-center >
          <v-text-field v-model = "search" label="Digite sua busca" solo dense hide-details append-icon='mdi-magnify'></v-text-field>
        </v-col>
        <v-col cols="6" sm="4" md="5" class="d-flex justify-end">
          <v-btn dark color="grey" @click="editInsertStudent(null)">Cadastrar Aluno</v-btn>
        </v-col>
      </v-row>

    </v-col>
    <v-col cols="12">

      <v-data-table
        :headers="headers"
        :items="items"
        :totalCount="totalCount"
        disable-pagination
        hide-default-footer
        :loading="isLoading"
        class="elevation-1"
      >
        <template
          v-slot:[`item.actions`]="{item}"
        >
          <v-btn text small @click="editInsertStudent(item.id)">Editar</v-btn>
          <v-btn text small @click="warmingScrean(item)">Excluir</v-btn>
        </template>
      </v-data-table>

      <div class="mt-16 d-flex align-end justify-end">
          <v-dialog v-model="dialog" width="400">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Remoção do aluno
              </v-card-title>

              <v-card-text class="mt-5">
                Deseja realmente excluir o aluno <b>{{studentDelete.name}}</b> ?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" text @click="dialog = false">
                  Não
                </v-btn>
                <v-btn color="green darken-1" text @click="deleteStudent()">
                  Sim
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
    </v-col>
  </v-row>

</template>

<script type="text/javascript" src="./script.js"/>

<style scoped lang="scss" src="./style.scss"/>