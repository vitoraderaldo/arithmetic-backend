import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../../domain/user/repository/user-repository.interface';
import { UserModel } from './user.model';
import { User } from '../../../domain/user/entity/user';
import { UserNotFound } from '../../../domain/user/error/user-not-found';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserModel)
    private readonly repo: Repository<UserModel>,
  ) {}

  async findByIdentityProviderId(identityProviderId: string): Promise<User> {
    const userModel = await this.repo.findOne({
      where: { identityProviderId },
    });
    if (!userModel?.id) {
      throw new UserNotFound();
    }
    return new User(
      userModel.id,
      userModel.email,
      userModel.statusId,
      userModel.currentBalance,
    );
  }

  async findByEmail(email: string): Promise<User> {
    const userModel = await this.repo.findOne({ where: { email } });
    if (!userModel?.id) {
      throw new UserNotFound();
    }
    return new User(
      userModel.id,
      userModel.email,
      userModel.statusId,
      userModel.currentBalance,
    );
  }

  async updateBalance(user: User): Promise<void> {
    await this.repo.update(
      {
        id: user.getId(),
      },
      { currentBalance: user.getCurrentBalance() },
    );
  }
}
