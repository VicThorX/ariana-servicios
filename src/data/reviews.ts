export interface Review {
  author: string;
  role: string;
  avatarUrl?: string; // Iniciales si no hay foto
  rating: number; // e.g. 5
  text: string;
  date: string; // e.g. "Hace 1 semana"
  verified: boolean;
}

export const googleReviews: Review[] = [
  {
    author: "María Inés Colombo",
    role: "Administradora de Consorcios (Edificios Zona Güemes y Playa Grande)",
    rating: 5,
    text: "Excelente servicio. Trabajamos con Ariana desde hace más de 4 años para la limpieza diaria de palieres y cocheras de 3 de nuestros edificios. Los supervisores están siempre atentos y responden al instante. Destaco la puntualidad del personal y la honestidad.",
    date: "Hace 2 semanas",
    verified: true,
  },
  {
    author: "Ing. Alejandro Rossi",
    role: "Gerente de Planta - Distribuidora Alimenticia (Parque Industrial MdP)",
    rating: 5,
    text: "Muy conformes con el servicio integral de limpieza y mantenimiento. Cubren las suplencias de manera inmediata cuando hay licencias, lo cual para nosotros es vital para no detener la operación. La provisión de insumos en bidones nos soluciona la logística mensual.",
    date: "Hace 1 mes",
    verified: true,
  },
  {
    author: "Dra. Sofía Martínez",
    role: "Directora Médica - Consultorios Odontológicos Integrales",
    rating: 5,
    text: "En salud la higiene debe ser impecable. Delegamos la desinfección de las salas de espera y consultorios en Ariana Servicios y los resultados son óptimos. Utilizan productos no invasivos de excelente calidad y el ambiente siempre queda aséptico y agradable.",
    date: "Hace 2 meses",
    verified: true,
  },
  {
    author: "Esteban Daniel Cedola",
    role: "Propietario - Oficinas Corporativas y Coworking (Zona Plaza Mitre)",
    rating: 5,
    text: "Contratamos el servicio de limpieza de vidrios de altura y mantenimiento de alfombras dos veces por semana. Las oficinas lucen impecables para recibir a nuestros clientes corporativos. Muy profesional todo el equipo de supervisión y el personal asignado.",
    date: "Hace 3 meses",
    verified: true,
  }
];
