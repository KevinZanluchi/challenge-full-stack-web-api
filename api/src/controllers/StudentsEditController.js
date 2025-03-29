const pool = require('../../configBD');

class StudentsEditController {

    async getStudentEdit (req,res) {
        const  id  = req.params.studant;
    
        try{
            const results = await pool.query(
                'SELECT ACADEMICRECORD, NAME, CPF, EMAIL FROM STUDENT  WHERE ID = $1',
                [id]
            );
            const rows = results.rows[0];
            return res.status(200).json(rows);
        }catch(err){
            return res.status(500).json({
                status: 'error',
                message: 'Erro ao consultar os alunos: ' + err
            })
        }
    }
    
    
    
    async addStudent (req, res) {
        try{
            const {name, email,academicrecord,cpf} = req.body;

            const existingStudent = await pool.query(
                'SELECT ID FROM STUDENT WHERE ACADEMICRECORD = $1',
                [academicrecord]
            );
    
            if (existingStudent.rows.length > 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Registro acadêmico já existe'
                });
            }

            await pool.query(
                'INSERT INTO STUDENT(NAME, EMAIL , ACADEMICRECORD , CPF ) VALUES ($1,$2,$3,$4)',
                [name, email,academicrecord,cpf]
            );
            return res.status(201).json({
                status: 'success',
                message: 'Aluno criado'
            });
        }catch(err){
            return res.status(500).json({
                status: 'error',
                message: 'Erro ao adicionar o aluno: ' + err
            })
        }
    }
    
    async editStudent (req, res) {
        try{
            const {name, email} = req.body;
            const id = req.params.studant
            
             await pool.query(
                'UPDATE STUDENT SET NAME = $2, EMAIL = $3 WHERE ID = $1',
                [id,name, email]
            );
            return res.status(200).json({
                status: 'success',
                message: 'Aluno alterado'
            });
        }catch(err){
            return res.status(500).json({
                status: 'error',
                message: 'Erro ao alterar o aluno: ' + err
            })
        }
    }
    
    async deleteStudent (req,res) {
        const id = req.params.studant;
        try{
            await pool.query(
                'UPDATE STUDENT SET ISDELETE = TRUE WHERE ID = $1',
                [id]
            );
            return res.status(200).json({
                status: 'success',
                message: 'Aluno apagado'
            })
        }catch(err){
            return res.status(500).json({
                status: 'error',
                message: 'Erro ao remover o aluno: ' + err
            })
        }
    }

}

module.exports = { StudentsEditController };