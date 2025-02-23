export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    photo: string;
  }
  
  export const peopleData: Person[] = [
    {
      id: 1,
      firstName: "Иван",
      lastName: "Иванов",
      description: "Родился в 1980 году.",
      photo: "namePeople-1/ivan.jpg",
    },
    {
      id: 2,
      firstName: "Мария",
      lastName: "Иванова",
      description: "Родилась в 1985 году.",
      photo: "namePeople-1/maria.jpg",
    },
    {
      id: 3,
      firstName: "Иван",
      lastName: "Иванов",
      description: "Родился в 1980 году.",
      photo: "namePeople-1/ivan.jpg",
    },
    {
      id: 4,
      firstName: "Мария",
      lastName: "Иванова",
      description: "Родилась в 1985 году.",
      photo: "namePeople-1/maria.jpg",
    },
  ];