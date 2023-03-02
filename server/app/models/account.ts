import { Table, Column, PrimaryKey, ForeignKey, BelongsTo, AutoIncrement, Unique, AllowNull, Default, HasMany, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import HttpStatusCode from '../utils/HttpStatusCode';
import { Content } from './content';
import { Group } from './group';

@Table
export class Account extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
    
    @Unique
    @AllowNull(false)
    @Column
    name!: string;

    @Unique
    @AllowNull(false)
    @Column
    mail!: string;

    @AllowNull(false)
    @Column
    password!: string;

    @ForeignKey(() => Group)
    @Column
    group_id!: number;

    @AllowNull(false)
    @Default(Date.now)
    @Column
    last_login!: Date;

    @CreatedAt
    created_at!: Date;

    @UpdatedAt
    updated_at!: Date;
 
    @AllowNull(false)
    @Default(false) 
    @Column
    is_activated!: boolean;

    @HasMany(() => Content)
    contents!: Content[];

    @BelongsTo(() => Group)
    group!: Group;
}


export const createAccount = [
    async (request: Request, response: Response) => {
        let accountData: any
        if(!request.body) {
            response.status(HttpStatusCode.BAD_REQUEST)
            return
        }

        if ('name' in request.body) {
            accountData.name = request.body.name
        }

        if ('mail' in request.body) {
            accountData.mail = request.body.mail
        }

        if ('password' in request.body) {
            accountData.password = bcrypt.hashSync(request.body.password, 8)
        }

        const account = new Account(accountData)
        await account.save()

        response
            .status(HttpStatusCode.CREATED)
            .send(account.id)
    }
]

const login = async (request: Request, response: Response) => {
    let user

    try {
        user = await Account.findOne({ where: { mail: request.body.mail } })
    } catch (e :any) {
        return response
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send({ message: e.message })
    }
        
    if (!user) {
        return response
            .status(HttpStatusCode.NOT_FOUND)
            .send({ message: 'User does not exist' })
    }
        
    const passwordIsValid = bcrypt.compareSync(
        request.body.password,
        user.password,
    )
        
    if (!passwordIsValid) {
        return response
            .status(HttpStatusCode.UNAUTHORIZED)
            .send({
                token: null,
                message: 'Password invalid'
            })
    }
        
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET!, 
        { expiresIn: Number(process.env.JWT_EXPIRES_IN ?? 86400) }
    )

    response.cookie(process.env.SITE_NAME ?? "testsite" + '_token', token, { 
        httpOnly: true, 
        maxAge: Number(process.env.JWT_EXPIRES_IN ?? 86400) * 1000,
    })

    user.last_login = new Date()
    user.save({ fields: ['last_login'] })

    response
        .status(HttpStatusCode.OK)
        .send({
            user,
        })
}

export const authRouter = Router()
authRouter.post('/login', login)