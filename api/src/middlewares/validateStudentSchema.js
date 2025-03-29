const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv);
require("ajv-errors")(ajv); 

const mensagensErro = {
    "must match pattern": "tem um formato inválido",
    "must be string" : "deve ser um texto",
    "should be string": "deve ser um texto",
    "should be number": "deve ser um número",
    "should be integer": "deve ser um número inteiro",
    "should NOT be shorter than": "deve ter pelo menos",
    "should NOT be longer than": "deve ter no máximo",
    "should have required property": "é um campo obrigatório"
};

const  validadeStudentSchema = (schema) => {
    const validate = ajv.compile(schema);

    return (req, res, next) => {
        const valid = validate(req.body);
        if (!valid) {
            const errorMessages = validate.errors.map(err => {
                let campo = err.instancePath.replace("/", "") || err.params?.missingProperty || "desconhecido";
                let mensagem = err.message;

                for (const [padrao, traducao] of Object.entries(mensagensErro)) {
                    if (mensagem.includes(padrao)) {
                        mensagem = traducao;
                        break; 
                    }
                }

                if (err.params?.limit) {
                    mensagem += ` ${err.params.limit} caracteres`;
                }

                return `${campo}: ${mensagem}`;
            }).join("\n");

            return res.status(400).json({
                error: `Dados inválidos:\n${errorMessages}`
            });
        }
        next();
    };

};

module.exports = validadeStudentSchema;
