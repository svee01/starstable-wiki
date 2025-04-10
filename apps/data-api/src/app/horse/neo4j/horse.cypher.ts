export const horseCypher = {
  /**
   * params: id, name, breed, age, characterId
   *
   * returns: horse
   */
  addHorse: `
    MATCH (character:Character {id: $characterId})
    CREATE (horse:Horse {
      id: $id,
      name: $name,
      breed: $breed,
      age: $age
    })
    CREATE (horse)-[:BELONGS_TO]->(character)
    RETURN horse
  `,

  /** params: id */
  deleteHorse: `
    MATCH (horse:Horse {id: $id})
    DETACH DELETE horse
  `,

  /**
   * params: id, name, breed, age
   *
   * returns: horse
   */
  updateHorse: `
    MATCH (horse:Horse {id: $id})
    SET horse.name = $name,
        horse.breed = $breed,
        horse.age = $age
    RETURN horse
  `,

  /** params: id */
  getHorseById: `
    MATCH (horse:Horse {id: $id})
    OPTIONAL MATCH (horse)-[:BELONGS_TO]->(character:Character)
    RETURN horse, character
  `,

  /**
   * returns: horse[]
   */
  getAllHorses: `
    MATCH (horse:Horse)
    OPTIONAL MATCH (horse)-[:BELONGS_TO]->(character:Character)
    RETURN horse, character
  `,
};
