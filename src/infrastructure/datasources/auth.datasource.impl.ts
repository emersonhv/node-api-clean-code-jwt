import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/postgres";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;

type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {}

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {
            const user = await UserModel.findOne({ where: { email: email }});
            if (!user) throw CustomError.badRequest('Incorrect credentials');

            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest('Incorrect credentials'); 

            return UserMapper.userEntityFromObject(user);
             
        } catch (error) {
            throw CustomError.internalServer();
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDto;

        try {
            //1. Valida si existe email en base de datos
            const emailExist = await UserModel.findOne({ where: { email: email }});
            if (emailExist) throw CustomError.badRequest(`User whit email '${email}' already exists`);

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
            });

            await user.save();

            return UserMapper.userEntityFromObject(user);
            
        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
            
        }
    }

}