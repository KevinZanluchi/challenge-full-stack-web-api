const updateStudentSchema = {
    type: "object",
    properties : {
        id: {type: "string", minLength: 1, pattern: "^[0-9]+$"},
        name: { type: "string", minLength: 3, maxLength: 20, pattern: "^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$"},
        email: { type: "string", format: "email" },
    },
    required: ["id","name","email"],
    additionalProperties: false,
};

module.exports = updateStudentSchema;