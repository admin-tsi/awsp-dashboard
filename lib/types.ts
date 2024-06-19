export interface User {
  _id: string;
  age: string;
  email: string;
  firstname: string;
  isverified: boolean;
  lastname: string;
  phone: string;
  role: string;
  clientData: any;
}

export interface Course {
  _id: string;
  title: string;
  video: string;
  description: string;
  courses_files: string[];
  __v: number;
}

export interface Quizz {
  _id: string;
  name: string;
  instructions: string;
  isEnabled: boolean;
  questions: Question[];
  duration: string;
  champScore: number;
  __v: number;
}

export interface Question {
  _id: string;
  question: string;
  options: Option[];
  answer: number[];
  isEnabled: boolean;
  explanation: string;
  questionScore: number;
}

export interface Option {
  _id: string;
  option: string;
}

export interface Module {
  id: string;
  moduleNumber: number;
  title: string;
  liveDate: string[];
}

export interface ModuleDetails {
  module?: Module;
  cours: Course;
  quizz: Quizz;
}

export interface Microcredential {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  topic: string;
  description: string;
  duration: string;
  notify_students: boolean;
  modules: ModuleDetails[];
  __v: number;
}
