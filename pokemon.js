class Pokemon {
  constructor(species, name, level=1) {
    // 1)Inicializar atributos usando los parámetros
    this.species = species;
    this.name = name;
    this.level = level;
    // 2)Inicializar atributos usando la información del Pokedex
    const pokeData = Pokemons.find(pokemon => pokemon.species === species);
    this.type = pokeData.type;
    this.baseStats = pokeData.baseStats;
    this.moves = pokeData.moves;
    // 3)Inicializar atributos según otras indicaciones
    // 4)this.experiencePoints = ;
    this.experiencePoints = ExperienceCurves[pokeData.growthRate](level);
    this.growthRate = pokeData.growthRate,
      // 5)this.individualValues = ;
      this.individualValues = {
        hp: Math.floor(Math.random() * 32),
        attack: Math.floor(Math.random() * 32),
        defense: Math.floor(Math.random() * 32),
        specialAttack: Math.floor(Math.random() * 32),
        specialDefense: Math.floor(Math.random() * 32),
        speed: Math.floor(Math.random() * 32),
      };
    // 6)this.effortValues = ;
    this.effortValues = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };

    if (pokeData.effortPoints) {
      const effortType = pokeData.effortPoints.type;
      const effortAmount = pokeData.effortPoints.amount;
      this.effortValues[effortType] = effortAmount;
    }
  }
  get stats() {
    const stats = {
      hp: this.calculateStat("hp"),
      attack: this.calculateStat("attack"),
      defense: this.calculateStat("defense"),
      specialAttack: this.calculateStat("specialAttack"),
      specialDefense: this.calculateStat("specialDefense"),
      speed: this.calculateStat("speed"),
    };

    // calcular las estadisticas actuales del Pokémon

    return stats;
  }

  calculateStat(statName) {
    const baseStat = this.baseStats[statName];
    const iv = this.individualValues[statName];
    const ev = this.effortValues[statName];
    const level = this.level;

    // Fórmula estándar para calcular las estadísticas de un Pokémon
    const stat = Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100 + 5);

    return stat;
  }

  expForLevel(n) {
    // obtener la función de crecimiento del pokedex
    // retornar el resultado de llamar a la función pasando `n`
    const growthRatePokemon = pokedex[this.growthRate];
    return Math.ceil(growthRatePokemon(n));
  }

  prepareForBattle() {
    // asignar al atributo currentHp la estadistica HP del Pokemon
    // resetear el atributo currentMove a null
    this.currentHp = this.baseStats.hp,
      this.currentMove = null

  }

  receiveDamage(damage) { // El método receiveDamage se usa para reducir los puntos de vida .
    // reducir currentHp en la cantidad de damage. No debe quedar menor a 0.
    this.currentHp = Math.max(0, this.currentHp - damage);//Esto actualiza los puntos de vida actuales del objeto después de recibir el daño.
  }

  setCurrentMove(move) {
    // buscar el move (string) en el pokedex y asignarlo al atributo currentMove
    this.currentMove = Moves.find(pokemonMove => pokemonMove.name === move);
  }

  isFainted() {
    // retornar si currentHp es 0 o no
    return this.currentHp === 0;
  }

  attack(target) {
    // anunciar "[nombre] used [MOVE]!"
    // determinar si el movimiento "pega" con moveHits()
    // si "pega":
    //  calcular daño base con calculateDamage
    //  determinar si es un critical hit con isCritical
    //  si es critico, anunciarlo
    //  calcular el multiplicador de efectividad con calculateEffectiveness
    //  anunciar mensaje según efectividad. Por ejemplo "It's not very effective..."
    //  calcular el daño final usando el daño base, si fue critico o no y la efectividad
    //  Hacer daño al oponente usando su metedo receiveDamage
    //  Anunciar el daño hecho: "And it hit [oponente] with [daño] damage"
    // si no "pega"
    //  anunciar "But it MISSED!"

    console.log(`${this.name} used ${this.currentMove.name}!`);

    if (this.moveHits()) {
      let damage = this.calculateBaseDamage(target);
      const isCritical = this.isCritical();
      if (isCritical) {
        console.log("A critical hit!");
        damage *= 2;
      }

      const effectiveness = this.calculateEffectiveness(target);
      if (effectiveness > 1) {
        console.log("It's super effective!");
      } else if (effectiveness < 1) {
        console.log("It's not very effective...");
      }

      damage = Math.floor(damage * effectiveness);
      target.receiveDamage(damage);
      console.log(`And it hit ${target.name} with ${damage} damage!`);
    } else {
      console.log("But it MISSED!");
    }
  }

  moveHits() {
    // calcular si pega en base al accuracy del currentMove
    return Math.random() < (this.currentMove.accuracy / 100);
  }

  isCritical() {
    // 1/16 de probabilidad que sea critico
    return Math.random() < (1 / 16);
  }

  calculateBaseDamage(target) {
    // determinar si el movimiento es especial comparando el currentMove con la data de Pokedex (SpecialMoveTypes)
    // determinar si se usara el stat attack o specialAttack del atacante
    // determinar si se usara el stat defense o specialDefense del defensor
    // retornar el rsultado de la formula de daño
    const isSpecial = SpecialMoveTypes.includes(this.currentMove.type);
    const attackStat = isSpecial ? this.stats.specialAttack : this.stats.attack;
    const defenseStat = isSpecial ? target.stats.specialDefense : target.stats.defense;

    return Math.floor(((2 * this.level / 5 + 2) * this.currentMove.power * attackStat / defenseStat / 50) + 2);
  }

  calculateEffectiveness(target) {
    // caluclar el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
    return target.type.reduce((effectiveness, type) => 
      effectiveness * TypeChart[this.currentMove.type][type], 1);
  }


  processVictory(target) {
      // calcular la experiencia ganada e incrementarla a tus experiencePoints
    // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    // anunciar "[nombre] gained [cantidad] experience points"
    // verificar si los nuevos experiencePoints te llevan a subir de nivel
    // si se sube de nivel
    // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
    
    const expGained = Math.floor(target.baseExperienceYield * target.level / 7);
    this.experiencePoints += expGained;
    console.log(`${this.name} gained ${expGained} experience points!`);
  
    const statToIncrease = target.effortPointYield.type;
    const evIncrease = target.effortPointYield.amount;
    this.effortValues[statToIncrease] = Math.min(255, this.effortValues[statToIncrease] + evIncrease);
  
    const oldLevel = this.level;
    while (this.experiencePoints >= this.expForLevel(this.level + 1)) {
      this.level++;
    }
  
    if (this.level > oldLevel) {
      console.log(`${this.name} reached level ${this.level}!`);
    }
  }
}



