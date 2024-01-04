import { User } from '../models/User';
import * as mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_technical_test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export class UserController {
  static async getAllUsers(): Promise<User[]> {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM users');
    return rows as User[];
  }

  static async getUserById(id: number): Promise<User | undefined> {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] as User | undefined;
  }

  static async createUser(user: User): Promise<{ user: User; message: string }> {
    try {
      const [result] = await pool.execute<mysql.ResultSetHeader>('INSERT INTO users (name, email) VALUES (?, ?)', [
        user.name,
        user.email,
      ]);
      const insertId = result.insertId;
      const newUser = { ...user, id: insertId } as User;
      return { user: newUser, message: 'Successfully added data.' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add data.');
    }
  }

  static async updateUser(id: number, updatedUser: User): Promise<{ user?: User; message: string }> {
    try {
      const [result] = await pool.execute<mysql.ResultSetHeader>(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [updatedUser.name, updatedUser.email, id]
      );
      if (result.affectedRows > 0) {
        const updatedUserData = { ...updatedUser, id } as User;
        return { user: updatedUserData, message: 'Data updated successfully.' };
      }
      return { message: 'Data not found or no changes.' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update data.');
    }
  }

  static async deleteUser(id: number): Promise<{ user?: User; message: string }> {
    try {
      const [result] = await pool.execute<mysql.ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
      if (result.affectedRows > 0) {
        return { user: { id } as User, message: 'Data deleted successfully.' };
      }
      return { message: 'Data not found.' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete data.');
    }
  }
}
