//data object
let indexQuestionsArray = [];
let gameScore = [];
let questions = [   
    {   letter: "a",
        status: 0,
	    letterQuest : [
            {
                answer: "abducir",
                status: 0,
                question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien")
            },
            {
                answer: "agenda",
                status: 0,
                question: ("CON LA A. Libro o cuaderno en el que se apunta para no olvidarlo aquello que se ha de hacer")
            },
            {
                answer: "aceite",
                status: 0,
                question: ("CON LA A. Líquido graso de color verde amarillento que se obtiene de la prensa de la aceituna.")
            },
        ],
    },
    {   letter: "b",
        status: 0,
        letterQuest : [
            {
                answer: "bingo",
                status: 0,
                question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso")
            },
            {
                answer: "buzón",
                status: 0,
                question: ("CON LA B. Abertura por donde se echan las cartas para el correo.")
            },
            {
                answer: "bonanza",
                status: 0,
                question: ("CON LA B. Prosperidad")
            }
        ],
    },
    {   letter: "c",
        status: 0,
        letterQuest : [
            {
                answer: "churumbel",
                status: 0,
                question: ("CON LA C. Niño, crío, bebé")
            },
            {
                answer: "caracol",
                status: 0,
                question: ("CON LA C. Nombre del molusco gasterópodo terrestre de corte en espiral cuya carne puede comerse")
            },
            {
                answer: "chandal",
                status: 0,
                question: ("CON LA C. Ropa de deporte que consta de un pantalón y un jersey o chaqueta amplios.")
            }
        ],
    },
    {   letter: "d",
        status: 0,
        letterQuest : [
            {
                answer: "diarrea",
                status: 0,
                question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida")
            },
            {
                answer: "devoto",
                status: 0,
                question: ("CON LA D. Dedicado con fervor a obras de piedad y devoción.")
            },
            {
                answer: "dormir",
                status: 0,
                question: ("CON LA D. Estar en aquel reposo que consiste en la inacción o suspensión de los sentidos y de todo movimiento voluntarios")
            }
        ],
    },
    {   letter: "e", 
        status: 0,
        letterQuest : [
            {
                answer: "ectoplasma",
                status: 0,
                question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación")
            },
            {
                answer: "entrecot",
                status: 0,
                question: ("CON LA E. Trozo de carne sacado de entre costilla y costilla de la res")
            },
            {
                answer: "entera",
                status: 0,
                question: ("CON LA E. Se dice de la leche que conserva toda su grasa y sustancias nutritivas.")
            }
        ],
    },
    {
        letter: "f",
        status: 0,
        letterQuest : [
            {
                answer: "fácil",
                status: 0,
                question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad")
            },
            {
                answer: "forestal",
                status: 0,
                question: ("CON LA F. Perteneciente o relativo a los bosques.")
            },
            {
                answer: "Farhadi",
                status: 0,
                question: ("CON LA F. Apellido del cineasta que dirigó la película El Viajante que obtuvo el oscar a la mejor película de habla no inglesa en 2017.")
            }
        ],
    },
    {   letter: "g",
        status: 0,
        letterQuest : [
            {
                answer: "galaxia",
                status: 0,
                question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas")
            },
            {
                answer: "gorgorito",
                status: 0,
                question: ("CON LA G. Coloquialmente quiebro que se hace con la voz con la garganta al cantar.")
            },
            {
                answer: "gorigori",
                status: 0,
                question: ("CON LA G. Coloquialmente, canto fúnebre con el que se acompaña los entierros")
            }
        ]
    },
    {
        letter: "h",
        status: 0,
        letterQuest : [
            {
                answer: "harakiri",
                status: 0,
                question: ("CON LA H. Suicidio ritual japonés por desentrañamiento")
            },
            {
                answer: "hombreras",
                status: 0,
                question: ("CON LA H. Adorno especial de un vestido en la parte correpondiente a los hombros.")
            },
            {
                answer: "hidroavión",
                status: 0,
                question: ("CON LA H. Avión que lleva en lugar de ruedas uno o cuatro flotadores para posarse sobre el agua.")
            }
        ]
    },
    {   letter: "i",
        status: 0,
        letterQuest : [
            {
                answer: "iglesia",
                status: 0,
                question: ("CON LA I. Templo cristiano")
            },
            {
                answer: "inapetencia",
                status: 0,
                question: ("CON LA I. Falta de gana de comer.")
            },
            {
                answer: "intuir",
                status: 0,
                question: ("CON LA I. Percibir íntima e instantáneamente una idea, tal como si se la tuviera a la vista.")
            }
        ]
    },
    {   letter: "j",
        status: 0,
        letterQuest : [
            {
                answer: "jabali",
                status: 0,
                question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba")
            },
            {
                answer: "jardinería",
                status: 0,
                question: ("CON LA J. Arte y oficio del jardinero.")
            },
            {
                answer: "jornada",
                status: 0,
                question: ("CON LA J. Tiempo de duración del trabajo diario.")
            }
        ]
    },
    {   letter: "k",
        status: 0,
        letterQuest : [
            {
                answer: "kamikaze",
                status: 0,
                question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria")
            },
            {
                answer: "kitesurf",
                status: 0,
                question: ("CON LA K. deporte de deslizamiento que consiste en el uso de una cometa de tracción, que tira del deportista, permitiendo a éste deslizarse sobre el agua mediante una tabla.")
            },
            {
                answer: "karaoke",
                status: 0,
                question: ("CON LA K. Diversión que consiste en cantar con pista mientras se siguen las letras de la misma en una pantalla.")
            }
        ]
    },
    {   letter: "l",
        status: 0,
        letterQuest : [
            {
                answer: "licantropo",
                status: 0,
                question: ("CON LA L. Hombre lobo")
            },
            {
                answer: "Lérmontov",
                status: 0,
                question: ("CON LA L. Apellido del poeta ruso autor de la obra 'La muerte del poeta' de 1837.")
            },
            {
                answer: "lobera",
                status: 0,
                question: ("CON LA L. Guarida de lobos.")
            }
        ]
        
    },
    {   letter: "m",
        status: 0,
        letterQuest : [
            {
                answer: "misantropo",
                status: 0,
                question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas")
            },
            {
                answer: "mentira",
                status: 0,
                question: ("CON LA M. Cosa que se utiliza por el camino que no es verdad con la intención de que sea creída.")
            },
            {
                answer: "misantropo",
                status: 0,
                question: ("CON LA M. Se dice de la persona que aún no ha alcanzado la mayoría de edad.")
            }
        ]
    },
    {   letter: "n",
        status: 0,
        letterQuest : [
            {
                answer: "necedad",
                status: 0,
                question: ("CON LA N. Demostración de poca inteligencia")
            },
            {
                answer: "ninfas",
                status: 0,
                question: ("CON LA N. Cada una de las fabulosas deidades de las aguas, bosques o selva.")
            },
            {
                answer: "nativo",
                status: 0,
                question: ("CON LA N. Se aplica al que ha nacido en el lugar de que se trata.")
            }  
        ]
    },
    {   letter: "o",
        status: 0,
        letterQuest : [
            {
                answer: "orco",
                status: 0,
                question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien")
            },
            {
                answer: "ordenanza",
                status: 0,
                question: ("CON LA O. Empleado que en ciertas oficinas realiza funciones subalternas.")
            },
            {
                answer: "órgano",
                status: 0,
                question: ("CON LA O. De las partes del pulpo, animal o vegetal que ejercen una función.")
            }
        ]
    },
    {   letter: "p",
        status: 0,
        letterQuest : [
           {
            answer: "protoss",
            status: 0,
            question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft")
           },
           {
            answer: "preferencia",
            status: 0,
            question: ("CON LA P. Anterioridad de algo respecto de otra cosa, en términos de orden o tiempo.")
           },
           {
            answer: "Plotino",
            status: 0,
            question: ("CON LA P. Filósofo romano máximo representante de la escuela neoplatónica y discípulo de Ammonio Sacas de Alejandría")
           } 
        ]
    },
    {   letter: "q",
        status: 0,
        letterQuest : [
            {
                answer: "queso",
                status: 0,
                question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche")
            },
            {
                answer: "branquias",
                status: 0,
                question: ("CON LA Q. Órgano respiratorio de los peces, formado por láminas o filamentos.")
            },
            {
                answer: "chisquero",
                status: 0,
                question: ("CONTIENE LA Q. Encendedor antiguo de bolsillo.")
            }
        ]
    },
    {   letter: "r",
        status: 0,
        letterQuest : [
            {
                answer: "raton",
                status: 0,
                question: ("CON LA R. Roedor")
            },
            {
                answer: "Renard",
                status: 0,
                question: ("CON LA R. Apellido del ingeniero francés que construyó el dirigible militar 'Le France' en 1884.")
            },
            {
                answer: "ráfaga",
                status: 0,
                question: ("CON LA R. Viento fuerte, resentido y de corta duración")
            }
        ]
    },
    {   letter: "s",
        status: 0,
        letterQuest : [
            {
                answer: "stackoverflow",
                status: 0,
                question: ("CON LA S. Comunidad salvadora de todo desarrollador informático")
            },
            {
                answer: "sencillez",
                status: 0,
                question: ("CON LA S. Se aplica a lo que no tiene complicación.")
            },
            {
                answer: "samba",
                status: 0,
                question: ("CON LA S. Danza popular brasileña.")
            }
        ]
    },
    {   letter: "t",
        status: 0,
        letterQuest : [
            {
                answer: "terminator",
                status: 0,
                question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984")
            },
            {
                answer: "trece",
                status: 0,
                question: ("CON LA T. Número cardinal equivalente a 10 + 3.")
            },
            {
                answer: "tragaperras",
                status: 0,
                question: ("CON LA T. Máquina de juegos de azar que funciona con monedas.")
            }
        ]
    },
    {   letter: "u",
        status: 0,
        letterQuest : [
            {
                answer: "unamuno",
                status: 0,
                question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914")
            },
            {
                answer: "uderzo",
                status: 0,
                question: ("CON LA U. Apellido del dibujante y guionista francés autor de la serie Asterix")
            },
            {
                answer: "usurpar",
                status: 0,
                question: ("CON LA U. Atribuirse o utilizar un título ajeno como propio.")
            }
        ]
    },
    {   letter: "v",
        status: 0,
        letterQuest : [
            {
                answer: "vikingos",
                status: 0,
                question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa.")
            },
            {
                answer: "verde",
                status: 0,
                question: ("CON LA V. Se aplica el color perfectamente al de la hierba fresca o la esmeralda.")
            },
            {
                answer: "vivienda",
                status: 0,
                question: ("CON LA V. Lugar cerrado y cubierto preparado para ser habitado por personas.")
            }
        ]
    },
    {   letter: "w",
        status: 0,
        letterQuest : [
            {
                answer: "sandwich",
                status: 0,
                question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso")
            },
            {
                answer: "whatsapp",
                status: 0,
                question: ("CON LA W. Programa multiplataforma de mensajería instantánea para teléfonos inteligentes, propiedad de Facebook.")
            },
            {
                answer: "darwin",
                status: 0,
                question: ("CONTIENE LA W. Naturalista inglés que planteó la idea de la evolución biológica a través de la selección natural.")
            }
        ]
    },
    {   letter: "x",
        status: 0,
        letterQuest : [
            {
                answer: "botox",
                status: 0,
                question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética")
            },
            {
                answer: "oxford",
                status: 0,
                question: ("CON LA X. Ciudad inglesa cuya universidad compite cada año en una famosa regata de remo.")
            },
            {
                answer: "exégesis",
                status: 0,
                question: ("CONTIENE LA X. Explicación o interpretación particularmente de los libros de la Biblia")
            }
        ]
    },
    {   letter: "y",
        status: 0,
        letterQuest : [
            {
                answer: "peyote",
                status: 0,
                question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos")
            },
            {
                answer: "leguleyo",
                status: 0,
                question: ("CONTIENE LA Y. Persona que aplica el derecho sin rigor y desenfrenadamente.")
            },
            {
                answer: "moncayo",
                status: 0,
                question: ("CONTIENE LA Y. Nombre de la montaña más alta del sistema ibérico")
            }
        ]
    },
    {   letter: "z",
        status: 0,
        letterQuest : [
            {
                answer: "zen",
                status: 0,
                question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional")
            },
            {
                answer: "zoodiacal",
                status: 0,
                question: ("CON LA Z. Perteneciente o relativo al zoodíaco:")
            },
            {
                answer: "zarandeo",
                status: 0,
                question: ("CON LA Z. Movimiento repetido y violento de un lado al otro.")
            }
        ]
    }
]


const totalQuestions = questions.length;
//variables
let idxLetter;                                      //index letter for each attemp
let idxQuestion = Math.floor(Math.random() * 3);    //index question of letter for each attemp
let game = false;                                   //start game
let players = 0;                                    //number of players
let nextWordRound = false;                          //round for next words
let currentIndex;                                   //current index control
let attempts = 0;                                   //atempts for each game
let score = 0;                                      
let errors = 0;

