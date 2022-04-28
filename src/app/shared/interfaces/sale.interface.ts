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
      title: string;
      workload: number;
      price: string;
      description: string;
    }
  ];
  value_paid: number,
  createdAt: string,
}
