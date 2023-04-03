import connectionDb from "../config/database.js";

async function findByEmail(email) {
    return await connectionDb.query(
        `    
        SELECT * FROM medics WHERE email=$1
    `,
        [email]
    );
}

async function create({ name, email, password, specialization_id, localization_id }) {
    await connectionDb.query(
        `
            INSERT INTO medics (name, email, password, specialization_id, localization_id)
            VALUES ($1, $2, $3, $4, $5)
        `,
        [name, email, password, specialization_id, localization_id]
    );
}

async function findById(id) {
    return await connectionDb.query(
        `    
        SELECT * FROM medics WHERE id=$1
    `,
        [id]
    );
}

export default {
    findByEmail,
    create,
    findById,
};