const createStudentSchema = {
    type: "object",
    properties : {
        name: { type: "string", minLength: 3, maxLength: 20, pattern: "^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$"},
        email: { type: "string", format: "email" },
        academicrecord: {type: "string", minLength: 12, maxLength: 12, pattern: "^[0-9]+$"},
        cpf: {type: "string", minLength: 11, maxLength: 11, pattern: "^[0-9]+$"}
    },
    required: ["name","email","academicrecord","cpf"],
    additionalProperties: false,
};

module.exports = createStudentSchema;