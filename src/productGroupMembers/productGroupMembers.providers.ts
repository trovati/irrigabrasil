import { DataSource } from 'typeorm';
import { ProductGroupMembers } from './productGroupMembers.entity';

export const productGroupMembersProviders = [
  {
    provide: 'PRODUCTGROUPMEMBERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductGroupMembers),
    inject: ['DATA_SOURCE'],
  },
];
