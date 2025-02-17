import List from '@/components/list';
import Register from '@/components/register';

export default {
  name: "Home",
  components: {
    List,
    Register,
  },
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: 'Aluno', icon: 'mdi-account' }
      ],
      activeScreen: 'List',
      editId: null 
    };
  },

  methods: {
    changeScreen(newScreen) {
      this.activeScreen = newScreen;
    },
    isEdit(idEdit){
      this.editId = idEdit;
    }
  },
};
