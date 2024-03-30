import Debug from 'debug';
import client from './client.js';

const debug = Debug('WeekAway:models:authDataMapper');

export default {
  async registerUser(user) {
    const query = `
      INSERT INTO "user"(firstname,lastname,email,password)
      VALUES($1,$2,$3,$4)
      RETURNING *;
    `;
    const values = [user.firstname, user.lastname, user.email, user.password];
    const results = await client.query(query, values);
    return results.rows[0];
  },

  async contact(email) {
    const allemail = await client.query('SELECT email FROM mail_newsletter');

    for (let i = 0; i < allemail.rows.length; i++) {
      if (allemail.rows[i].email === email) {
        return { message: 'email already exists' };
      }
    }

    const query = `
      INSERT INTO mail_newsletter(email)
      VALUES($1)
      RETURNING *;
    `;
    const values = [email];
    const results = await client.query(query, values);
    return results.rows[0];
  },
};
