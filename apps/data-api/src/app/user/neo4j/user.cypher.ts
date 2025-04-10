export const userCypher = {
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
  updateUser: `
    MATCH (user:User {id: $id})
    SET user.name = $name,
        user.email = $email,
        user.password = $password,
        user.role = $role
    RETURN user
  `,
  removeUser: `
    MATCH (user:User {id: $id})
    DETACH DELETE user
  `,
  getUserById: `
    MATCH (user:User {id: $id})
    RETURN user
  `,
  getUserByEmail: `
    MATCH (user:User {email: $email})
    RETURN user
  `,
  getAllUsers: `
    MATCH (user:User)
    RETURN user
  `
};
