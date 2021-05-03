import { UserTypes } from '../../helpers/user-types-enum';
export class CreateUserDTO {
  readonly phoneNumber: string;
  readonly birthdayDate: Date;
  readonly email: string;
  name: string;
  password: string;
  readonly userType: UserTypes;
  professionalHealthRegisterCode?: {
    registerCodeType: string;
    code: string;
  };
  readonly healthArea?: string;
  officeAddress?: string;
  formationType?: string;
  description?: string;
}
