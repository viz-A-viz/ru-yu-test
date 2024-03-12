declare module '@nestjs/common' {
  interface Request {
    user: {
      id: number;
    };
  }
}

export {};
