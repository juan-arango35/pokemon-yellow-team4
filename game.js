class Game {
  start() {
    // llamar a welcome para el proceso de bienvenida y obtener el arreglo [name, pokemon, pokemonName]
    const [name, pokemon, pokemonName] = Game.welcome();

    // crear un Player con la info obtenida (tu pokemon empieza con nivel 3 por defecto). Asignarlo al atributo 'player'
    this.player = new Player(name, pokemon, pokemonName, 3);

    // Empezar el bucle del juego
    // Usar menu() para pedir al usuario que elija entre Train, Leader o Stats
    // Ejecutar train(), challengeLeader() o showStats() segun la opción del usuario
    // Continuar el bucle hasta que el usuario aprete Cancel
    let option = Game.menu(); // crea una variable option y le asigna el valor devuelto por la función Game.menu()
    while (option !== null) { //Este es un bucle while que se ejecutará mientras la variable option no sea null.
      switch (option) {
        case 'Train':
          this.train();
          break;
        case 'Leader':
          this.challengeLeader();
          break;
        case 'Stats':
          this.showStats();
          break;
      }

      option = Game.menu();
    }

    // Llamar a goodbye para la despedida
    Game.goodbye();
  }

  train() {
    // Crear un Bot llamado "Random Person", con un Pokemon aleatorio de nivel entre 1 y 5
    const randomLevel = Math.floor(Math.random() * 5) + 1;
    const pokemons = ['Bulbasaur', 'Charmander', 'Squirtle'];
    const randomIndex = Math.floor(Math.random() * pokemons.length);

    const randomPokemon = pokemons[randomIndex];
    const opponent = new Bot("Random Person", randomPokemon, randomPokemon, randomLevel);

    // Anunciar "[nombre] challenges [oponente] for training"
    console.log(`${this.player.name} challenges ${opponent.name} for training`);

    // Anunciar "[oponente] has a [pokemon] level [nivel]"
    console.log(`${opponent.name} has a ${opponent.pokemon.species} level ${opponent.pokemon.level}`);

    // Usar confirm() para preguntar al usuario si quiere pelear "Do you want to fight?"
    // Si, sí quiere pelear
    // Crear una Batalla entre el player y el oponente
    // empezar la batalla con su start
    if (confirm("Do you want to fight?")) {
      const battle = new Battle(this.player, opponent);
      battle.start();
    }
  }

  challengeLeader() {
    // mismo mecanismo que train() pero el Bot se llama Brock y usa un Onix nivel 10
    const opponent = new Bot("Brock", "Onix", "Onix", 10);

    console.log(`${this.player.name} challenges ${opponent.name} for training`);
    console.log(`${opponent.name} has a ${opponent.pokemon.species} level ${opponent.pokemon.level}`);

    if (confirm("Do you want to fight?")) {
      const battle = new Battle(this.player, opponent);
      battle.start();
    }
  }

  showStats() {
    // usar console.table para presentar las estadisticas de tu pokemon:
    /*
      - species
      - level
      - type
      - experiencePoints
      stats:
      - hp
      - attack
      - defense
      - specialAttack
      - specialDefense
      - speed
    */
    const pokemon = this.player.pokemon;
    const stats = {
      species: pokemon.species,
      level: pokemon.level,
      type: pokemon.type.join(", "),
      experiencePoints: pokemon.experiencePoints,
      stats: "",
      hp: pokemon.stats.hp,
      attack: pokemon.stats.attack,
      defense: pokemon.stats.defense,
      specialAttack: pokemon.stats.specialAttack,
      specialDefense: pokemon.stats.specialDefense,
      speed: pokemon.stats.speed
    };

    console.table(stats);
  }

  static welcome() {
    alert(`Welcome to Pokemon Yellow

Hello there! Welcome to the world of POKEMON! My name is OAK! People call me the POKEMON PROF!

This world is inhabited by creatures called POKEMON! For some people, POKEMON are pets. Others use them for fights.

Myself... I study POKEMON as a profession.`);

    const name = prompt("First, what is your name?", "Ash");

    alert(`Right! So your name is ${name.toUpperCase()}!

Your very own POKEMON legend is about to unfold! A world of dreams and adventures with POKEMON awaits! Let's go!

Here, ${name.toUpperCase()}! There are 3 POKEMON here!

When I was young, I was a serious POKEMON trainer. In my old age, I have only 3 left, but you can have one!`);

    const options = ["Bulbasaur", "Charmander", "Squirtle"];
    let pokemon;
    while (true) {
      pokemon = prompt(
        `Choose your pokemon:\n${options.join("\n")}`,
        options[0]
      );
      if (options.includes(pokemon)) break;

      alert("Invalid option");
    }

    alert(`You selected ${pokemon.toUpperCase()}. Great choice!`);

    const pokemonName =
      prompt("You can name your pokemon:", pokemon) || pokemon;

    alert(`${name.toUpperCase()}, raise your young ${pokemonName.toUpperCase()} by making it fight!

When you feel ready you can challenge BROCK, the PEWTER's GYM LEADER`);

    return [name, pokemon, pokemonName];
  }

  static menu() {
    // pedir al usuario que elija entre "Train", "Stats", "Leader";
    const options = ["Train", "Stats", "Leader"];
    // retornar una opcion valida
    let choice;
    while (true) {
      choice = prompt(`What do you want to do next?\n ${options.join("\n")}`, options[0]);
      if (choice === null) return null;
      if (options.includes(choice)) return choice;
      alert("Invalid option");
    }
  }

  static goodbye() {
    console.log("%cThanks for playing Pokemon Yellow", "font-weight: bold");
    console.log("This game was created with love by: ...");
  }
}
