import { Table, Column, ForeignKey, BelongsTo, AllowNull, Model, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';
import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import HttpStatusCode from '../utils/HttpStatusCode';
import { ContentType } from './contentType';
import { Account } from './account';

@Table
export class Content extends Model {
    @ForeignKey(() => ContentType)
    @Column
    contentType_id!: number;

    @AllowNull(false)
    @Column
    title!: string;

    @Column(DataType.TEXT('long'))
    text!: string;

    @ForeignKey(() => Account)
    @Column
    account_id!: number;

    @CreatedAt
    created_at!: Date;

    @UpdatedAt
    updated_at!: Date;

    @BelongsTo(() => ContentType)
    contentType!: ContentType;

    @BelongsTo(() => Account)
    account!: Account;
}


export const createContent = [
    async (request: Request, response: Response) => {
        let contentData: any
        if(!request.body) {
            response.status(HttpStatusCode.BAD_REQUEST)
            return
        }

        if ('name' in request.body) {
            contentData.name = request.body.name
        }

        if ('mail' in request.body) {
            contentData.mail = request.body.mail
        }

        if ('password' in request.body) {
            contentData.password = bcrypt.hashSync(request.body.password, 8)
        }
        
        const content = new Content(contentData)
        await content.save()

        response
            .status(HttpStatusCode.CREATED)
            .send(content.id)
    }
]


export const contentRouter = Router()
contentRouter.post('/content', createContent)