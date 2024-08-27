import { UserDTO } from '../../user/dtos/user.dto';

export interface LoginResponseDTO {
  access_token: string;
  user: UserDTO;
}
