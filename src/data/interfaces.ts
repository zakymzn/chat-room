export interface Datas {
  results: Result[];
}

export interface Result {
  room: Room;
  comments: Comment[];
}

export interface Comment {
  id: number;
  type: string;
  message: string;
  sender: string;
}

export interface Room {
  name: string;
  id: number;
  image_url: string;
  participant: Participant[];
}

export interface Participant {
  id: string;
  name: string;
  role: number;
}
