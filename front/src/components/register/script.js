import studentService from '@/services/api/students';
export default {
  name: "Register",
  props: {
    idEdit:{
      type:String,
      default:null
    },
  },
  data() {
    return {
      student: {
        academicrecord: "",
        name: "",
        cpf: "",
        email: "",
      },
      teste:[],
      isEditing: false,
      validButtom: true,
      dialog: false,
      textAlert:"",
    nameRules: [
      v => !!v || 'Nome é obrigatorio',
      v => (v && v.length <= 20) || 'Nome precisa ter menos de 20 caracteres',
    ],

    emailRules: [
      v => !!v || 'E-mail é obrigatorio',
      v => /.+@.+\..+/.test(v) || 'E-mail precisar ser valido',
    ],
    academicRecordRules: [
      v => !!v || 'RA é obrigatorio',
      v => (v && v.length == 12) || 'Nome precisa ter 12 caracteres',
    ],
    cpfRules: [
      v => !!v || 'CPF é obrigatório',
      v => /^\d{3}\d{3}\d{3}\d{2}$/.test(v) || 'CPF precisa ser válido'
    ]
    };
  },
  created(){
    if(this.idEdit){
      this.isEditing= true;
      this.getStudentById(this.idEdit);
    }

  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    save() {

      if(!this.validate()){       
        return;
      }

      if (this.isEditing) {
        this.sendEditStudent();
      } else {
        this.postStudent();
      }
            
      this.dialog = true
    },
    async postStudent(){
      try {
        const body = {
          name: this.student.name,
          email: this.student.email,
          academicrecord: this.student.academicrecord,
          cpf: this.student.cpf
        };
        await studentService.post(body);
        this.textAlert="Aluno cadastrado com sucesso!"
      } catch (err) {
        this.validButtom = false;
      if (err.response && err.response.data) {
          this.textAlert=`Erro: ${err.response.data.error}`;
          console.log(err.response.data);
      } else {
          this.textAlert="Erro inesperado ao cadastrar aluno.";
      }
      }
    },
    async getStudentById(studentId) {
      try {
        const { data } = await studentService.getStudentById(studentId);
        this.student= data;
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    },
    async sendEditStudent(){
      try {
        const body = {
          id: String(this.idEdit),
          name: this.student.name,
          email: this.student.email,
          // academicrecord: this.student.academicrecord,
          // cpf: this.student.cpf
        };
        const res = await studentService.patch(this.idEdit,body);
        this.textAlert="Realizado a alteração com sucesso!"
      } catch (err) {
        this.validButtom = false;
        if (err.response && err.response.data) {
          this.textAlert=` Erro: ${err.response.data.error}`;
        } else {
          this.textAlert="Erro inesperado ao cadastrar aluno.";
        }
      }
    },
    sendData(){
      this.clearData();
      this.chanceScream();
    },
    chanceScream(){
      this.isEditing= false;
      this.$emit('change-screen', 'Search');
    },
    clearData(){
      this.dialog = false;
      this.student = { academicrecord: "", name: "", cpf: "", email: "" };
    },
    closeAlertErro(){
      this.dialog = false
      this.validButtom = true;
    }
  },
};
