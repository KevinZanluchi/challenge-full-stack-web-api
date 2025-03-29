const pool = require('../../configBD');

class StudentsSearchController {

    async getStudents (req,res) {
        let searchParams = '';
        const { student } = req.query;
        const values =[];
    
        if(student){
            values.push(`%${student}%`);
            searchParams += `(NAME ILIKE $${values.length} OR ACADEMICRECORD ILIKE $${values.length})`
        }
    
        try{
            const { rows } = await pool.query(`
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
            `,values);
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

}

module.exports = { StudentsSearchController };