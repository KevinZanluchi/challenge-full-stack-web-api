import studentService from '@/services/api/students';

export default {
  name: "List",
  props: {
    idEdit: String,
  },
  data() {
    return {
      search: "",
      isLoading: false,
      items: [],
      totalCount: 0,
      dialog: false,
      studentDelete: []
    };
  },
  created(){
    this.headers =  [
      { text: 'Registro Acadêmico', align: 'center' , value: 'academicrecord'},
      { text: 'Nome', align: 'center', value: 'name'},
      { text: 'CPF', align: 'center', value: 'cpf'},
      { text: 'Ações', align: 'center', value: 'actions',sortable: false}
    ]
    this.getAllStudents();
  },
  watch: {
    search(newSearch) {
     
      if (newSearch){
        this.getAllStudents(newSearch);
      } else {
        this.getAllStudents();
      }
    }
  },
  methods:{
    async getAllStudents(newSearch = ''){
      this.isLoading = true;
      try {
        const { data }  = await studentService.get(newSearch);
        const { results, totalCount } = data;
        this.items = results;
        this.totalCount = totalCount;
      } catch(err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    warmingScrean(item){
      console.log(item);
      this.studentDelete  = item;
      this.dialog = true;
    },
    async deleteStudent(){
      try {
        const res = await studentService.delete(this.studentDelete.id);
      } catch (err) {
        console.log(err);
      } finally {
        this.dialog = false;
        this.getAllStudents();
      }
    },
    editInsertStudent(studentId){
      this.$emit('is-edit', studentId);
      this.$emit('change-screen', 'Register');
    }
  }
};
