export interface Sale {
  _id: string,
  client: {
    name: string;
    surname: number;
    email: string;
    cpf: number;
  };
  courses: [
    {
      _id: string;
      title: string,
      workload: number,
      type: string,
      area: string,
      price: number,
    }
  ];
  value_paid: number,
  thing: number,
  user_logued: {
    _id: string,
    name: string,
    roles: {
      admin: boolean,
      basic: boolean,
    }
  }
  createdAt: string,
}
