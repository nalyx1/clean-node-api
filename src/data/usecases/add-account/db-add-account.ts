import { AccountModel } from '../../../domain/models/account';
import {
  AddAccount,
  AddAccountModel
} from '../../../domain/usecases/add-account';
import { Encrypter } from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}
  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password);
    const fakeAccount = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: hashedPassword
    };
    return new Promise((resolve) => resolve(fakeAccount));
  }
}
