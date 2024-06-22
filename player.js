
class Player {
  constructor(name, species, pokeName, level) {
    // asignar name a un atributo con el mismo nombre
    this.name = name;
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
    this.pokemon = new Pokemon(species, pokeName, level);
  }

  selectMove() {
    const moves = this.pokemon.moves; //Asigna la lista de movimientos del Pokémon del jugador a la constante moves.
    let selectedMove; //Declara una variable para almacenar el movimiento seleccionado por el jugador.
    while (!selectedMove) { //Inicia un bucle while que continuará hasta que selectedMove tenga un valor.
      const userInput = prompt(
        `${this.name}, Choose a move:\n${moves.map(move => move).join('\n')}\n`, moves[0]);//crea un mensaje que incluye el nombre del jugador ( en this.name) y muestra una lista de movimientos disponibles
      if (userInput === null) return true; //Si el usuario cancela el prompt, el método selectMove retorna true y termina.
      selectedMove = moves.find(move => move === userInput); // Busca en la lista de movimientos uno cuyo nombre coincida con el userInput y lo asigna a selectedMove.
      if (!selectedMove) { //Si no se encuentra un movimiento válido (es undefined), muestra una alerta indicando que la opción es inválida.
        alert("Invalid option");
      }
    }

    this.pokemon.setCurrentMove(selectedMove); //Establece el movimiento actual del Pokémon del jugador al movimiento seleccionado.
  }
}

class Bot extends Player { //Se declara una nueva clase Bot que hereda de la clase Player
  selectMove() { //Este método se encargará de seleccionar un movimiento para el Pokémon del bot.
    const moves = this.pokemon.moves; //declara una constante moves, asigna el array de movimientos del Pokémon asociado con esta instancia de Bot.
    const randomIndex = Math.floor(Math.random() * moves.length);//Calcula un índice aleatorio que se puede usar para acceder a un elemento en el array de movimientos.
    const selectedMove = moves[randomIndex];// Toma un movimiento aleatorio del array moves y lo asigna a la variable selectedMove
    this.pokemon.setCurrentMove(selectedMove);


  }
}