const express = require('express');
const cors = require('cors');
const pool = require('./configBD');

const app = express();
app.use(express.json());
app.use(cors());


const getStudents = async (req,res) =>{
    let searchParams = '';
    const {student} = req.params;

    const values =[];

    if(student){
        values.push(`%${student}%`);
        searchParams += `(NAME ILIKE $${values.length} OR ACADEMICRECORD ILIKE $${values.length})`
    }

    try{
        const {rows} = await pool.query(`
            SELECT 
                ID,
                ACADEMICRECORD, 
                NAME,
                CPF,
                count(1) OVER() AS "totalCount"
            FROM 
                STUDENT 
            ${searchParams ? `WHERE ${searchParams} AND ISDELETE = FALSE` : `WHERE ISDELETE = FALSE`} 
            ORDER BY ID    
        `);
        return res.status(200).json({
            results: rows, 
            totalCount: rows.length ? parseInt(rows[0].totalCount) : 0
        });
    }catch(err){
        return res.status(500).json({
            status: 'error',
            message: 'Erro ao consultar os alunos: ' + err
        })
    }
}

const getStudentEdit = async (req,res) =>{
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

const getStudentSearch = async (req,res) =>{
    const name  = req.params.studant;

    try{
        const results = await pool.query(
            `SELECT ID, ACADEMICRECORD, NAME, CPF FROM STUDENT  WHERE NAME ILIKE $1`,
            [`${name}%`]
        );
        const rows = results.rows;
        return res.status(200).json(rows);
    }catch(err){
        return res.status(500).json({
            status: 'error',
            message: 'Erro ao consultar os alunos: ' + err
        })
    }
}


const addStudent = async (req, res) => {
    try{
        const {name, email,academicrecord,cpf} = req.body;
        const results = await pool.query(
            'INSERT INTO STUDENT(NAME, EMAIL , ACADEMICRECORD , CPF ) VALUES ($1,$2,$3,$4)',
            [name, email,academicrecord,cpf]
        );
        return res.status(200).json({
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

const editStudent = async (req, res) => {
    try{
        const {name, email} = req.body;
        const id = req.params.studant
        
        const results = await pool.query(
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

const deleteStudent = async (req,res) =>{
    const id = req.params.studant;
    try{
        const results = await pool.query(
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


app.route('/students')
    .get(getStudents)
    .post(addStudent)

app.route('/searchs/:studant')
    .get(getStudentSearch)

app.route('/students/:studant')
    .delete(deleteStudent)
    .patch(editStudent)
    .get(getStudentEdit)



app.listen( 3002, () =>{
    console.log('Servidor da API rodando...')
});


