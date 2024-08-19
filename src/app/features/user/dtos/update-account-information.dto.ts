import { UserDTO } from './user.dto';

export interface UpdateAccountInformationRequestDTO {
  id: number;
  name: string;
  email: string;
  profile_photo: string | null;
}

export interface UpdateAccountInformationResponseDTO {
  message: string;
  success: boolean;
  data: UserDTO;
}
