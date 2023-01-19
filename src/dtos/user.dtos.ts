export class CreateUserDto {
  readonly name: string;
  readonly email: string;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
}
