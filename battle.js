class Battle {
  constructor(player1, player2) {
    // asigna los jugadores a sus respectivos atributos
    this.player1 = player1;
    this.player2 = player2;
  }

  start() {
    // Anunciar "The battle is about to start!"
    // preparar la batalla con prepareBattle()
    // Usar un bucle para todos los turnos
    // Ambos jugadores seleccionan un movimiento
    // Si al seleccionar un movimiento, retorna 'true' terminar la batalla y anunciar "[nombre] run away!"
    // Calcular quien atacara primero
    // El primero ataca al segundo
    // Si el segundo aun no se desmaya...
    // El segundo ataca al primero
    // El bucle continua hasta que alguno se desmaye
    // Al terminar el bucle, identificar al ganador y al perdedor
    // Anunciar "[perdedor] FAINTED!"
    // Anunciar "[ganador] WINS!"
    // Se procesa la victoria
    console.log("The battle is about to start!");
    this.prepareBattle();

    while (true) {
      if (this.player1.selectMove()) {
        console.log(`${this.player1.name} run away!`);
        return;
      }
      if (this.player2.selectMove()) {
        console.log(`${this.player2.name} run away!`);
        return;
      }

      const firstAttacker = this.getFirstPokemon();
      const secondAttacker = firstAttacker === this.player1.pokemon ? this.player2.pokemon : this.player1.pokemon;

      firstAttacker.attack(secondAttacker);
      if (!secondAttacker.isFainted()) {
        secondAttacker.attack(firstAttacker);
      }

      this.printBattleStatus();

      if (this.player1.pokemon.isFainted() || this.player2.pokemon.isFainted()) {
        break;
      }
    }

    const pokemonWinner = this.player1.pokemon.isFainted() ? this.player2.pokemon : this.player1.pokemon;
    const pokemonLoser = winner === this.player1.pokemon ? this.player2.pokemon : this.player1.pokemon;

    console.log(`${pokemonLoser.name} FAINTED!`);
    console.log(`${pokemonWinner.name} WINS!`);
    pokemonWinner.processVictory(pokemonLoser);
  }

  prepareBattle() {
    // llamar a prepareForBattle de los pokemones de ambos jugadores
    // anunciar "[judgador]sent out [POKEMON]!" para ambos jugadores
    this.player1.pokemon.prepareForBattle();
    this.player2.pokemon.prepareForBattle();
    console.log(`${this.player1.name} sent out ${this.player1.pokemon.name}!`);
    console.log(`${this.player2.name} sent out ${this.player2.pokemon.name}!`);
  }

  getFirstPokemon() {
    // verificar si un pokemon empieza por tener movimiento con mayor prioridad con firstByPriority
    // verificar si un pokemon empieza por tener  mayor velocidad con firstBySpeed
    // si no, elegir uno de manera aleatorio
    const byPriority = this.firstByPriority();
    if (byPriority) return byPriority;

    const bySpeed = this.firstBySpeed();
    if (bySpeed) return bySpeed;

    return Math.random() < 0.5 ? this.player1.pokemon : this.player2.pokemon;
  }

  firstByPriority() {
    // retornar el pokemon con movimiento de mayor prioridad. Si igualan, retornar null
    const priority1 = this.player1.pokemon.currentMove.priority;
    const priority2 = this.player2.pokemon.currentMove.priority;

    if (priority1 > priority2) return this.player1.pokemon;
    if (priority2 > priority1) return this.player2.pokemon;
    return null;
  }

  firstBySpeed() {
    // retornar el pokemon de mayor velocidad. Si igualan, retornar null
    const speed1 = this.player1.pokemon.stats.speed;
    const speed2 = this.player2.pokemon.stats.speed;

    if (speed1 > speed2) return this.player1.pokemon;
    if (speed2 > speed1) return this.player2.pokemon;
    return null;
  }

  printBattleStatus() {
    // usar conole.table para mostrar el status de la batalla (player, pokemon, level, currentHp)
    console.table([
      {
        player: this.player1.name,
        pokemon: this.player1.pokemon.name,
        level: this.player1.pokemon.level,
        currentHp: this.player1.pokemon.currentHp
      },
      {
        player: this.player2.name,
        pokemon: this.player2.pokemon.name,
        level: this.player2.pokemon.level,
        currentHp: this.player2.pokemon.currentHp
      }
    ]);
  }
}
