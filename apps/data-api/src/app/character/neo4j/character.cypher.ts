export const characterCypher = {
  /**
   * params: id, name, ridingSkill, userId, stableId
   *
   * returns: character
   */
  addCharacter: `
    MATCH (user:User {id: $userId}), (stable:Stable {id: $stableId})
    CREATE (character:Character {
      id: $id,
      name: $name,
      ridingSkill: $ridingSkill
    })
    CREATE (character)-[:OWNED_BY]->(user)
    CREATE (character)-[:STABLED_AT]->(stable)
    RETURN character
  `,

  /** params: id */
  removeCharacter: `
    MATCH (character:Character {id: $id})
    DETACH DELETE character
  `,

  /**
   * params: id, name, ridingSkill
   *
   * returns: character
   */
  updateCharacter: `
    MATCH (character:Character {id: $id})
    SET character.name = $name,
        character.ridingSkill = $ridingSkill
    RETURN character
  `,

  /** params: id */
  getCharacterById: `
    MATCH (character:Character {id: $id})
    OPTIONAL MATCH (character)-[:OWNED_BY]->(user:User)
    OPTIONAL MATCH (character)-[:STABLED_AT]->(stable:Stable)
    RETURN character, user, stable
  `,

  /**
   * returns: character[]
   */
  getAllCharacters: `
    MATCH (character:Character)
    OPTIONAL MATCH (character)-[:OWNED_BY]->(user:User)
    OPTIONAL MATCH (character)-[:STABLED_AT]->(stable:Stable)
    RETURN character, user, stable
  `,
};
