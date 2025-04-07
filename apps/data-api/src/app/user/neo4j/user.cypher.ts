export const userCypher = {
  /**
   * params: id, name, email, password, role
   * returns: user
   */
  addUser: `
    CREATE (user:User {
      id: $id,
      name: $name,
      email: $email,
      password: $password,
      role: $role
    })
    RETURN user
  `,

  getUserByUsername: 'MATCH (user:User {username: $username}) RETURN user',

  /** params: id */
  removeUser: `
    MATCH (user:User {id: $id})
    DETACH DELETE user
  `,

  /** params: id, name, email, password, role */
  updateUser: `
    MATCH (user:User {id: $id})
    SET user.name = $name,
        user.email = $email,
        user.password = $password,
        user.role = $role
    RETURN user
  `,

  /** params: id */
  getUserById: `
    MATCH (user:User {id: $id})
    RETURN user
  `,

  /** returns user[] */
  getAllUsers: `
    MATCH (user:User)
    RETURN user
  `,
};
