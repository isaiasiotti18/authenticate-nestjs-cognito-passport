export interface IGenericRepository<T> {
  create(createDto: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOneById(id: any): Promise<T>;
  update(id: any, updateDto: T): Promise<T>;
  delete(id: any): Promise<void>;
}
