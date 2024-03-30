import Debug from 'debug';
import client from './client.js';

const debug = Debug('WeekAway:models:dataMapper');

export default class coreDataMapper {
  async findAll() {
    const preparedQuery = {
      text: `SELECT * FROM "${this.constructor.tableName}"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  async findById(id) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.constructor.tableName}" 
        WHERE id = $1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  async findByEmail(email) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.constructor.tableName}" WHERE email = $1`,
      values: [email],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  async deleteById(id) {
    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id = $1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }
}
