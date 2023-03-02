import { Table, Column, ForeignKey, Model } from 'sequelize-typescript';
import { Router, Request, Response } from 'express'
import HttpStatusCode from '../utils/HttpStatusCode';
import { Group } from './group';
import { Permission } from './permission';

@Table({ timestamps: false, createdAt: false, updatedAt: false, })
export class GroupPermission extends Model {
    @ForeignKey(() => Group)
    @Column
    group_id!: number;

    @ForeignKey(() => Permission)
    @Column
    permission_id!: number;
}
