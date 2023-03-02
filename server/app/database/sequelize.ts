import { Sequelize } from 'sequelize-typescript';
import { Account } from '../models/account';
import { Content } from '../models/content';
import { ContentType } from '../models/contentType';
import { Group } from '../models/group';
import { GroupPermission } from '../models/groupPermission';
import { Permission } from '../models/permission';

export const sequelize = new Sequelize(
  process.env.DB_NAME ?? "testsite",
  process.env.DB_USER ?? "root",
  process.env.DB_PASSWORD ?? "",
  {
    logging: console.log,
    host: process.env.DB_HOST ?? "localhost",
    dialect: 'mariadb',
    models: [Account, Group, Permission, GroupPermission, Content, ContentType],
  }
);