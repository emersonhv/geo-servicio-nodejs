import { BcryptAdapter } from "../../config";
import Logger from "../../config/logger";
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

            //if (!user.status) throw CustomError.badRequest('User is not verifided');

            const isMatching = this.comparePassword(password, user.password);

            if (!isMatching) throw CustomError.badRequest('Incorrect credentials'); 

            return UserMapper.userEntityFromObject(user);
             
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDto;

        try {

            const emailExist = await UserModel.findOne({ where: { email: email }});
            if (emailExist) throw CustomError.badRequest(`User whit email '${email}' already exists`);

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
            });

            await user.save();

            return UserMapper.userEntityFromObject(user);

            //TODO: Enviar correo Electronico de verificacion de Email sendEmailVerification
            
        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
            
        }
    }

    private async sendEmailVerification(registerUserDto: RegisterUserDto): Promise<boolean> {
        
        //TODO: Enviar correo electronico a usaurio para verificar EMAIL

        return true;
    }

    //private async sendEmailVerified():  {}

}