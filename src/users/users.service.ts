import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) 
        private userRepository: typeof User
        ) {}

    async createUser(dto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: dto.email,
            }
        });

        if(!existUser) {
            const hashPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.userRepository.create(dto);
            return user;
        } else {
            throw new BadRequestException('This email already exist');
        }
    }

    async getUsers() {

        const users = await this.userRepository.findAll();

        if(users) {
            return users;
        } else {
            throw new BadRequestException(`Users does not exist`);
        }

    }

    async getUser(id: string) {

        const user = await this.userRepository.findOne({where: {id}});
        if(user) {
            return user;
        } else {
            return `User with ID ${id} not exist`;
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {

        let user = await this.userRepository.findOne({
            where: {
                id: id
            }
        })

        if(user) {
            Object.assign(user, updateUserDto);
            await user.save();
            return user;
        } else {
            throw new BadRequestException(`User does not exist`);
        }
    }

    async removeUser(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            }
        })
    
        if(user) {
        await user.destroy();
        return 'User deleted successfully';
        } else {
        throw new BadRequestException(`User does not exist`);
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        return user;
    }
}