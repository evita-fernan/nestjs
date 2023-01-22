import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Naza',
      email: 'naza@mail.com',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    console.log(apiKey);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id}  not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    //Con esta sentencia se indica que mantenga los datos anteriores del usuario y que actualice solo lo que venga en el payload
    return this.users[index];
  }
  //Se busca un usuario, luego se busca la posición de ese usuario en el array de usuarios
  //Teniendo la posición se actualiza el dato que el usuario quiere actualizar y que viene en el payload
  //Finalmente se retorna el dato actualizado

  getOrderByUser(userId: number): Order {
    const user = this.findOne(userId);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
