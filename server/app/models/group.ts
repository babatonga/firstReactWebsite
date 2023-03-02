import { Table, Column, BelongsToMany, BelongsTo, HasMany, AllowNull, ForeignKey, Model, CreatedAt, UpdatedAt, HasOne } from 'sequelize-typescript';
import { Router, Request, Response } from 'express'
import HttpStatusCode from '../utils/HttpStatusCode';
import { Account } from './account';
import { Permission } from './permission';
import { GroupPermission } from './groupPermission';

@Table
export class Group extends Model {
    @AllowNull(false)
    @Column
    name!: string;

    @ForeignKey(() => Group)
    @Column
    parentgroup_id!: number;

    @CreatedAt
    created_at!: Date;

    @UpdatedAt
    updated_at!: Date;

    @HasMany(() => Account)
    accounts!: Account[]
    
    @HasOne(() => Group)
    parentgroup!: Group

    @BelongsToMany(() => Permission, () => GroupPermission)
    permissions!: Permission[];

}
