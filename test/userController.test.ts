import { expect } from 'chai';
import { UserController } from '../src/controllers/UserController';
import { User } from '../src/models/User';

describe('UserController', () => {
  let users: User[];

  beforeEach(() => {
    users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];
  });

  it('should get all users', () => {
    const allUsers = UserController.getAllUsers();
    expect(allUsers).to.deep.equal(users);
  });

  it('should get user by id', () => {
    const userId = 1;
    const user = UserController.getUserById(userId);
    expect(user).to.deep.equal(users[0]);
  });

  it('should create a new user', () => {
    const newUser: User = { id: 3, name: 'New User', email: 'newuser@example.com' };
    const createdUser = UserController.createUser(newUser);
    expect(createdUser).to.deep.equal(newUser);
    expect(users).to.include(createdUser);
  });

  it('should update user by id', () => {
    const userId = 1;
    const updatedUser: User = { name: 'Updated User', email: 'updated@example.com' };
    const user = UserController.updateUser(userId, updatedUser);
    expect(user).to.deep.equal({ id: 1, ...updatedUser });
    expect(users[0]).to.deep.equal({ id: 1, ...updatedUser });
  });

  it('should delete user by id', () => {
    const userId = 1;
    const deletedUser = UserController.deleteUser(userId);
    expect(deletedUser).to.deep.equal(users[0]);
    expect(users).to.not.include(deletedUser);
  });
});