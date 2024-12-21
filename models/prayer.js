const db = require('../config/database');

class Prayer {
  static async create(prayerText) {
    try {
      const [result] = await db.execute(
        'INSERT INTO prayers_wishes (prayer_text, created_at) VALUES (?, NOW())',
        [prayerText]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const [rows] = await db.execute('SELECT * FROM prayers_wishes ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Prayer;