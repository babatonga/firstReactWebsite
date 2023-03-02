import { Table, Column, HasMany, AllowNull, ForeignKey, Model, CreatedAt, UpdatedAt, HasOne, BelongsTo } from 'sequelize-typescript';
import { Router, Request, Response } from 'express'
import HttpStatusCode from '../utils/HttpStatusCode';
import { Content } from './content';

@Table({ timestamps: false, createdAt: false, updatedAt: false, })
export class ContentType extends Model {
    @AllowNull(false)
    @Column
    name!: string;

    @ForeignKey(() => ContentType)
    @Column
    parentperm_id!: number;

    @HasMany(() => Content)
    contents!: Content[]
    
    @HasOne(() => ContentType)
    parentperm!: ContentType

}
