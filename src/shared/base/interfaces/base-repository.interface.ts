export interface IGenericRepository<T> {
  create(createDto: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: T): Promise<T>;
  update(id: any, updateDto: T): Promise<T>;
  remove(id: any): Promise<T>;
}
