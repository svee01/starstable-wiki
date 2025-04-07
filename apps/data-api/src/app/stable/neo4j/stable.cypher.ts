export const stableCypher = {
  /**
   * params: id, name, location
   *
   * returns: stable
   */
  addStable: `
    CREATE (stable:Stable {
      id: $id,
      name: $name,
      location: $location
    })
    RETURN stable
  `,

  /** params: id */
  removeStable: `
    MATCH (stable:Stable {id: $id})
    DETACH DELETE stable
  `,

  /**
   * params: id, name, location
   *
   * returns: stable
   */
  updateStable: `
    MATCH (stable:Stable {id: $id})
    SET stable.name = $name,
        stable.location = $location
    RETURN stable
  `,

  /** params: id */
  getStableById: `
    MATCH (stable:Stable {id: $id})
    RETURN stable
  `,

  /**
   * returns: stable[]
   */
  getAllStables: `
    MATCH (stable:Stable)
    RETURN stable
  `,
};
