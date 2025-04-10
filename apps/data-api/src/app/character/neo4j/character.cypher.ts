export const characterCypher = {
  /**
   * params: id, name, ridingSkill, userId, stableId
   *
   * returns: character
   */
  addCharacter: `
    MERGE (user:User {id: $userId})
    MERGE (stable:Stable {id: $stableId})
    CREATE (character:Character {
      id: $id,
      name: $name,
      ridingSkill: $ridingSkill
    })
    CREATE (character)-[:BELONGS_TO]->(stable)
    CREATE (character)-[:OWNED_BY]->(user)
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
    OPTIONAL MATCH (character)-[:BELONGS_TO]->(stable:Stable)
    OPTIONAL MATCH (character)-[:OWNED_BY]->(user:User)
    RETURN character, stable, user
  `,

  /**
   * returns: character[]
   */
  getAllCharacters: `
    MATCH (character:Character)
    OPTIONAL MATCH (character)-[:BELONGS_TO]->(stable:Stable)
    OPTIONAL MATCH (character)-[:OWNED_BY]->(user:User)
    RETURN character, stable, user
  `,
};
