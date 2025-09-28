export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  surname: string;
  description: string;
  photo: string;
  placeOfBirth: string;
  livingNow: string;
  phoneNumber: number;
  photoAlbum: Photo[];
  x: number;
  y: number;
}
interface Photo {
  photoId: number;
  urlSrc: string;
}

  export const peopleData: Person[] = [
    {
      id: 1,
      firstName: "Олег",
      lastName: "Карпенко",
      surname: "Юрьевич",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi libero aperiam soluta officiis enim repellendus iure. Recusandae illum esse praesentium, consectetur libero iusto facere ut voluptas est nulla assumenda!",
      photo: "olegKarpenko/mainImg.jpg",
      placeOfBirth:"Ульяновская область, Мелекесский р-н, дер. Аврали",
      phoneNumber: 89297975091,
      livingNow: 'г. Москва',
      x:0,
      y: 0,
      photoAlbum: [
        {
          photoId: 1,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 2,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 3,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 4,
          urlSrc: "olegKarpenko/mainImg.jpg"
        }
      ]
    },
    {
      id: 2,
      firstName: "Олег",
      lastName: "Карпенко",
      surname: "Юрьевич",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi libero aperiam soluta officiis enim repellendus iure. Recusandae illum esse praesentium, consectetur libero iusto facere ut voluptas est nulla assumenda!",
      photo: "olegKarpenko/mainImg.jpg",
      placeOfBirth:"Ульяновская область, Мелекесский р-н, дер. Аврали",
      phoneNumber: 89297975091,
      livingNow: 'г. Москва',
      x:400,
      y: 200,
      photoAlbum: [
        {
          photoId: 1,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 2,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 3,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 4,
          urlSrc: "olegKarpenko/mainImg.jpg"
        }
      ]
    },
    {
      id: 3,
      firstName: "Олег",
      lastName: "Карпенко",
      surname: "Юрьевич",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi libero aperiam soluta officiis enim repellendus iure. Recusandae illum esse praesentium, consectetur libero iusto facere ut voluptas est nulla assumenda!",
      photo: "olegKarpenko/mainImg.jpg",
      placeOfBirth:"Ульяновская область, Мелекесский р-н, дер. Аврали",
      phoneNumber: 89297975091,
      livingNow: 'г. Москва',
      x:800,
      y: 200,
      photoAlbum: [
        {
          photoId: 1,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 2,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 3,
          urlSrc: "olegKarpenko/mainImg.jpg"
        },
        {
          photoId: 4,
          urlSrc: "olegKarpenko/mainImg.jpg"
        }
      ]
    },
  ];