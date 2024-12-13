export interface User {
  _id: string;
  age: string;
  email: string;
  firstname: string;
  isverified: boolean;
  lastname: string;
  phone: string;
  role: string;
  clientData: ClientData;
  type_compte: string;
}

interface ClientData {
  _id: string;
  sex: string;
  awsp_country: string;
  passions: string[];
  sports: string[];
  nationality: string;
  locality: string;
  state: string;
  profession: string;
  education: string;
  communication: string;
  __v: number;
}

export interface Course {
  _id: string;
  title_en: string;
  title_fr: string;
  video: string;
  playback_id?: string;
  description_en: string;
  description_fr: string;
  courses_files: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  exercice?: {
    _id: string;
    exo_file: string;
    students_reviews: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface Quizz {
  _id: string;
  name: string;
  instructions_en: string;
  isEnabled: boolean;
  questions: Question[];
  duration: string;
  champScore: number;
  __v: number;
}

export interface Question {
  _id: string;
  question_en: string;
  options_en: Option[];
  answer: number[];
  isEnabled: boolean;
  explanation_en: string;
  questionScore: number;
}

export interface Option {
  _id?: string;
  option: string;
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

export interface ModuleDetails {
  _id: string;
  moduleNumber: number;
  title: string;
  liveDate: string[];
  cours: string;
  quizz: string;
  exercise: Exercise[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Microcredential {
  _id: string;
  title: string;
  thumbnail: string;
  price_usd: number;
  price_xof: number;
  notify_students: boolean;
  topic_en: string;
  topic_fr: string;
  description_en: string;
  description_fr: string;
  modules: ModuleDetails[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  finalQuizz?: {
    _id: string;
    name: string;
    isEnabled: boolean;
    questions: string[];
    duration: string;
    champScore: number;
    __v: number;
  };
}

export interface Exercise {
  _id: string;
  exo_file: string;
  description: string;
  instruction: string;
  students_reviews: any[];
}
