export type GameId =
  "colors" | "animals" | "objects" | "verbs" | "food" | "numbers";

export type Word = {
  english: string;
  italian: string;
  image?: string;
  color?: string;
  number?: number;
};

export type Game = {
  id: GameId;
  title: string;
  english: string;
  description: string;
  prompt: string;
  label: string;
  words: Word[];
};

export const games: Game[] = [
  {
    id: "colors",
    title: "Un mondo di colori",
    english: "Colors",
    description: "Un pizzico di rosso, un salto nel blu.",
    prompt: "Trova questo colore",
    label: "Guarda e scegli",
    words: [
      { english: "Red", italian: "Rosso", color: "#ef5350" },
      { english: "Blue", italian: "Blu", color: "#387de0" },
      { english: "Yellow", italian: "Giallo", color: "#f7cf40" },
      { english: "Green", italian: "Verde", color: "#49a86c" },
      { english: "Orange", italian: "Arancione", color: "#f39338" },
      { english: "Pink", italian: "Rosa", color: "#ee91ba" },
      { english: "Purple", italian: "Viola", color: "#9a6bca" },
      { english: "White", italian: "Bianco", color: "#ffffff" },
      { english: "Black", italian: "Nero", color: "#2d3034" },
      { english: "Brown", italian: "Marrone", color: "#88512e" },
      { english: "Grey", italian: "Grigio", color: "#8c8c8c" },
      { english: "Light blue", italian: "Azzurro", color: "#9dd9f3" },
      { english: "Dark blue", italian: "Blu scuro", color: "#183473" },
      { english: "Light green", italian: "Verde chiaro", color: "#b9e9a3" },
      { english: "Dark green", italian: "Verde scuro", color: "#165438" },
      { english: "Light pink", italian: "Rosa chiaro", color: "#fbd4e4" },
      { english: "Dark red", italian: "Rosso scuro", color: "#891c30" },
      { english: "Turquoise", italian: "Turchese", color: "#30c7be" },
      { english: "Beige", italian: "Beige", color: "#dfcfac" },
      { english: "Olive", italian: "Verde oliva", color: "#80852d" },
      { english: "Lime", italian: "Verde lime", color: "#b4e326" },
      { english: "Peach", italian: "Pesca", color: "#ffc498" },
      { english: "Lavender", italian: "Lavanda", color: "#d0b9ec" },
      { english: "Coral", italian: "Corallo", color: "#fa806b" },
    ],
  },
  {
    id: "animals",
    title: "Amici a quattro zampe",
    english: "Animals",
    description: "Chi si nasconde nella giungla?",
    prompt: "Come si chiama in inglese?",
    label: "Scopri gli animali",
    words: [
      { english: "Cat", italian: "Gatto", image: "1f408" },
      { english: "Dog", italian: "Cane", image: "1f415" },
      { english: "Lion", italian: "Leone", image: "1f981" },
      { english: "Elephant", italian: "Elefante", image: "1f418" },
      { english: "Rabbit", italian: "Coniglio", image: "1f407" },
      { english: "Fish", italian: "Pesce", image: "1f41f" },
      { english: "Bird", italian: "Uccello", image: "1f426" },
      { english: "Monkey", italian: "Scimmia", image: "1f412" },
      { english: "Horse", italian: "Cavallo", image: "1f40e" },
      { english: "Cow", italian: "Mucca", image: "1f404" },
      { english: "Pig", italian: "Maiale", image: "1f416" },
      { english: "Sheep", italian: "Pecora", image: "1f411" },
      { english: "Goat", italian: "Capra", image: "1f410" },
      { english: "Chicken", italian: "Gallina", image: "1f414" },
      { english: "Duck", italian: "Anatra", image: "1f986" },
      { english: "Frog", italian: "Rana", image: "1f438" },
      { english: "Turtle", italian: "Tartaruga", image: "1f422" },
      { english: "Butterfly", italian: "Farfalla", image: "1f98b" },
      { english: "Bee", italian: "Ape", image: "1f41d" },
      { english: "Ant", italian: "Formica", image: "1f41c" },
      { english: "Spider", italian: "Ragno", image: "1f577" },
      { english: "Snake", italian: "Serpente", image: "1f40d" },
      { english: "Tiger", italian: "Tigre", image: "1f405" },
      { english: "Bear", italian: "Orso", image: "1f43b" },
      { english: "Panda", italian: "Panda", image: "1f43c" },
      { english: "Koala", italian: "Koala", image: "1f428" },
      { english: "Fox", italian: "Volpe", image: "1f98a" },
      { english: "Wolf", italian: "Lupo", image: "1f43a" },
      { english: "Zebra", italian: "Zebra", image: "1f993" },
      { english: "Giraffe", italian: "Giraffa", image: "1f992" },
      { english: "Kangaroo", italian: "Canguro", image: "1f998" },
      { english: "Penguin", italian: "Pinguino", image: "1f427" },
      { english: "Dolphin", italian: "Delfino", image: "1f42c" },
      { english: "Whale", italian: "Balena", image: "1f40b" },
      { english: "Shark", italian: "Squalo", image: "1f988" },
      { english: "Octopus", italian: "Polpo", image: "1f419" },
      { english: "Crab", italian: "Granchio", image: "1f980" },
      { english: "Crocodile", italian: "Coccodrillo", image: "1f40a" },
      { english: "Deer", italian: "Cervo", image: "1f98c" },
      { english: "Snail", italian: "Lumaca", image: "1f40c" },
    ],
  },
  {
    id: "objects",
    title: "Il mondo intorno a te",
    english: "Everyday things",
    description: "Piccole cose, nuove parole da scoprire.",
    prompt: "Quale figura corrisponde alla parola?",
    label: "Ascolta e trova",
    words: [
      { english: "Book", italian: "Libro", image: "1f4d5" },
      { english: "Ball", italian: "Palla", image: "26bd" },
      { english: "Pencil", italian: "Matita", image: "270f" },
      { english: "Apple", italian: "Mela", image: "1f34e" },
      { english: "Car", italian: "Automobile", image: "1f697" },
      { english: "House", italian: "Casa", image: "1f3e0" },
      { english: "Chair", italian: "Sedia", image: "1fa91" },
      { english: "Backpack", italian: "Zaino", image: "1f392" },
      { english: "Pen", italian: "Penna", image: "1f58a" },
      { english: "Ruler", italian: "Righello", image: "1f4cf" },
      { english: "Scissors", italian: "Forbici", image: "2702" },
      { english: "Umbrella", italian: "Ombrello", image: "2602" },
      { english: "Bed", italian: "Letto", image: "1f6cf" },
      { english: "Door", italian: "Porta", image: "1f6aa" },
      { english: "Window", italian: "Finestra", image: "1fa9f" },
      { english: "Key", italian: "Chiave", image: "1f511" },
      { english: "Clock", italian: "Orologio", image: "1f570" },
      { english: "Phone", italian: "Telefono", image: "1f4f1" },
      { english: "Computer", italian: "Computer", image: "1f4bb" },
      { english: "Television", italian: "Televisione", image: "1f4fa" },
      { english: "Camera", italian: "Macchina fotografica", image: "1f4f7" },
      { english: "Bicycle", italian: "Bicicletta", image: "1f6b2" },
      { english: "Train", italian: "Treno", image: "1f686" },
      { english: "Bus", italian: "Autobus", image: "1f68c" },
      { english: "Boat", italian: "Barca", image: "26f5" },
      { english: "Airplane", italian: "Aeroplano", image: "2708" },
      { english: "Shoe", italian: "Scarpa", image: "1f45f" },
      { english: "Hat", italian: "Cappello", image: "1f3a9" },
      { english: "Socks", italian: "Calzini", image: "1f9e6" },
      { english: "Glasses", italian: "Occhiali", image: "1f453" },
      { english: "Toothbrush", italian: "Spazzolino", image: "1faa5" },
      { english: "Soap", italian: "Sapone", image: "1f9fc" },
    ],
  },
  {
    id: "verbs",
    title: "Pronti, partenza... go!",
    english: "Action words",
    description: "Corri, salta e fai volare le parole.",
    prompt: "Come si dice in inglese?",
    label: "Parole in movimento",
    words: [
      { english: "Run", italian: "Correre", image: "1f3c3" },
      { english: "Swim", italian: "Nuotare", image: "1f3ca" },
      { english: "Eat", italian: "Mangiare", image: "1f37d" },
      { english: "Drink", italian: "Bere", image: "1f964" },
      { english: "Sleep", italian: "Dormire", image: "1f634" },
      { english: "Read", italian: "Leggere", image: "1f4d6" },
      { english: "Sing", italian: "Cantare", image: "1f3a4" },
      { english: "Dance", italian: "Ballare", image: "1f483" },
      { english: "Write", italian: "Scrivere", image: "270d" },
      { english: "Draw", italian: "Disegnare", image: "1f58d" },
      { english: "Walk", italian: "Camminare", image: "1f6b6" },
      { english: "Jump", italian: "Saltare", image: "1f998" },
      { english: "Fly", italian: "Volare", image: "1f54a" },
      { english: "Listen", italian: "Ascoltare", image: "1f442" },
      { english: "Look", italian: "Guardare", image: "1f440" },
      { english: "Speak", italian: "Parlare", image: "1f5e3" },
      { english: "Laugh", italian: "Ridere", image: "1f606" },
      { english: "Cry", italian: "Piangere", image: "1f622" },
      { english: "Cook", italian: "Cucinare", image: "1f373" },
      { english: "Wash", italian: "Lavare", image: "1f9fc" },
      { english: "Open", italian: "Aprire", image: "1f513" },
      { english: "Close", italian: "Chiudere", image: "1f512" },
      { english: "Play", italian: "Giocare", image: "1f9f8" },
      { english: "Ride", italian: "Andare in bicicletta", image: "1f6b4" },
    ],
  },
  {
    id: "food",
    title: "Parole da assaggiare",
    english: "Food",
    description: "Frutta, verdura e un pizzico di golosit\u00e0.",
    prompt: "Trova questo cibo",
    label: "Ascolta e trova",
    words: [
      { english: "Apple", italian: "Mela", image: "1f34e" },
      { english: "Banana", italian: "Banana", image: "1f34c" },
      { english: "Pear", italian: "Pera", image: "1f350" },
      { english: "Orange", italian: "Arancia", image: "1f34a" },
      { english: "Strawberry", italian: "Fragola", image: "1f353" },
      { english: "Grapes", italian: "Uva", image: "1f347" },
      { english: "Watermelon", italian: "Anguria", image: "1f349" },
      { english: "Cherries", italian: "Ciliegie", image: "1f352" },
      { english: "Peach", italian: "Pesca", image: "1f351" },
      { english: "Pineapple", italian: "Ananas", image: "1f34d" },
      { english: "Lemon", italian: "Limone", image: "1f34b" },
      { english: "Kiwi", italian: "Kiwi", image: "1f95d" },
      { english: "Tomato", italian: "Pomodoro", image: "1f345" },
      { english: "Carrot", italian: "Carota", image: "1f955" },
      { english: "Broccoli", italian: "Broccoli", image: "1f966" },
      { english: "Potato", italian: "Patata", image: "1f954" },
      { english: "Corn", italian: "Mais", image: "1f33d" },
      { english: "Cucumber", italian: "Cetriolo", image: "1f952" },
      { english: "Bread", italian: "Pane", image: "1f35e" },
      { english: "Cheese", italian: "Formaggio", image: "1f9c0" },
      { english: "Egg", italian: "Uovo", image: "1f95a" },
      { english: "Rice", italian: "Riso", image: "1f35a" },
      { english: "Pasta", italian: "Pasta", image: "1f35d" },
      { english: "Pizza", italian: "Pizza", image: "1f355" },
      { english: "Sandwich", italian: "Panino", image: "1f96a" },
      { english: "Salad", italian: "Insalata", image: "1f957" },
      { english: "Cake", italian: "Torta", image: "1f382" },
      { english: "Ice cream", italian: "Gelato", image: "1f368" },
      { english: "Cookie", italian: "Biscotto", image: "1f36a" },
      { english: "Chocolate", italian: "Cioccolato", image: "1f36b" },
      { english: "Honey", italian: "Miele", image: "1f36f" },
      { english: "Milk", italian: "Latte", image: "1f95b" },
    ],
  },
  {
    id: "numbers",
    title: "Uno, due... one, two!",
    english: "Numbers",
    description: "Una scoperta dopo l'altra, da zero a venti.",
    prompt: "Come si dice questo numero?",
    label: "Conta e scegli",
    words: [
      { english: "Zero", italian: "Zero", number: 0 },
      { english: "One", italian: "Uno", number: 1 },
      { english: "Two", italian: "Due", number: 2 },
      { english: "Three", italian: "Tre", number: 3 },
      { english: "Four", italian: "Quattro", number: 4 },
      { english: "Five", italian: "Cinque", number: 5 },
      { english: "Six", italian: "Sei", number: 6 },
      { english: "Seven", italian: "Sette", number: 7 },
      { english: "Eight", italian: "Otto", number: 8 },
      { english: "Nine", italian: "Nove", number: 9 },
      { english: "Ten", italian: "Dieci", number: 10 },
      { english: "Eleven", italian: "Undici", number: 11 },
      { english: "Twelve", italian: "Dodici", number: 12 },
      { english: "Thirteen", italian: "Tredici", number: 13 },
      { english: "Fourteen", italian: "Quattordici", number: 14 },
      { english: "Fifteen", italian: "Quindici", number: 15 },
      { english: "Sixteen", italian: "Sedici", number: 16 },
      { english: "Seventeen", italian: "Diciassette", number: 17 },
      { english: "Eighteen", italian: "Diciotto", number: 18 },
      { english: "Nineteen", italian: "Diciannove", number: 19 },
      { english: "Twenty", italian: "Venti", number: 20 },
    ],
  },
];

export type Question = { word: Word; options: Word[] };
export type Answer = { word: Word; selected: Word };
export type Round = {
  gameId: GameId;
  questions: Question[];
  answers: Answer[];
};

export function shuffle<Value>(
  values: readonly Value[],
  random = Math.random,
): Value[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function createRound(
  gameId: GameId,
  previous?: Round,
  random = Math.random,
): Round {
  const game = games.find((entry) => entry.id === gameId);
  if (!game) throw new Error("Unknown game");
  const words = shuffle(game.words, random).slice(0, 6);
  if (previous?.questions[0].word.english === words[0].english) {
    [words[0], words[1]] = [words[1], words[0]];
  }
  return {
    gameId,
    questions: words.map((word) => ({
      word,
      options: shuffle(
        [
          word,
          ...shuffle(
            game.words.filter((entry) => entry.english !== word.english),
            random,
          ).slice(0, 3),
        ],
        random,
      ),
    })),
    answers: [],
  };
}

export function scoreRound(answers: Answer[]) {
  return answers.filter(
    (answer) => answer.word.english === answer.selected.english,
  ).length;
}
