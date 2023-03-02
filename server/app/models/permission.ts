import { Table, Column, BelongsToMany, AllowNull, Model } from 'sequelize-typescript';
import { Router, Request, Response } from 'express'
import HttpStatusCode from '../utils/HttpStatusCode';
import { GroupPermission } from './groupPermission';
import { Group } from './group';

@Table({ timestamps: false, createdAt: false, updatedAt: false, })
export class Permission extends Model {
    @AllowNull(false)
    @Column
    name!: string;

    @BelongsToMany(() => Group, () => GroupPermission)
    groups!: Group[];
}
