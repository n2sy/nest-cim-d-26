import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class TimeStamp {
  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  UpdatedAt;

  @DeleteDateColumn()
  DeleteAt;
}
