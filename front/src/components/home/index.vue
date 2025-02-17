<template>
  <v-container class="ma-1">
    <v-row no-gutters>
      <v-col cols="6" sm="3" class="d-flex align-center justify-center mb-2">
        <v-img :src="require('@/assets/img/Logo.png')" max-width="120" contain></v-img>
      </v-col>
      <v-col cols="6" sm="9" class=""> </v-col>

       <v-col cols="6" sm="3" class="dash">
            <v-card class="mx-auto mt-0" max-width="300" height="600" tile flat outlined>
              <v-list dense class="pt-0">
                <div class="d-flex align-center justify-center gray-white header-menu">
                  <h3 class="gray-white__font--white">Modulo Acadêmico</h3>
                </div>
                <v-list-item-group v-model="selectedItem">
                  <v-list-item v-for="(item, i) in items" :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon>
                        {{item.icon}}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{item.text}}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
      </v-col>

      <v-col cols="6" sm="9" class="border dash">       
        <Register 
          v-if="activeScreen === 'Register'" 
          @change-screen="changeScreen"
          :idEdit="editId"  
        />
        <List  
          v-else 
          @change-screen="changeScreen"
          @is-edit="isEdit"  
        />
      </v-col>

    </v-row>
  </v-container>
</template>

<script type="text/javascript" src="./script.js" />

<style scoped lang="scss" src="./style.scss" />
