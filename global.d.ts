declare namespace Express {
  interface Request {
    user?: any;
  }
}

type InputCreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

type OutputCreateUserDTO = {
  name: string;
  email: string;
  createAt: string;
  updateAt: string;
};

type InputAuth = {
  email: string;
  password: string;
};

type InputCreateMovieDTO = {
  title: string;
  director: string;
  year: string;
  gender: string;
  countryOfOrigin: string;
  language: string;
  duration: number;
};

type OutputCreateMovieDTO = {
  id: string;
  title: string;
  director: string;
  year: string;
  gender: string;
  countryOfOrigin: string;
  language: string;
  duration: string;
  createAt: string;
  updateAt: string;
};

type InputToken = {
  body: any;
  expiresIn: string;
};
