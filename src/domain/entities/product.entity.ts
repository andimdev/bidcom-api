export type ProductProps = {
  id: string
  name: string
  description?: string | null
  price: number
  stock: number
  category: string
  brand: string
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class Product {
  private props: ProductProps

  private constructor(props: ProductProps) {
    this.validate(props)
    this.props = props
  }

  static create(input: Omit<ProductProps, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    return new Product({
      ...input,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    })
  }

  static rehydrate(props: ProductProps) {
    return new Product(props)
  }

  private validate(props: ProductProps) {
    if (!props.name) throw new Error('Invalid name')
    if (props.price < 0) throw new Error('Invalid price')
  }

  update(data: Partial<ProductProps>) {
    this.props = {
      ...this.props,
      ...data,
      updatedAt: new Date(),
    }
  }

  delete() {
    this.props.deletedAt = new Date()
  }

  isDeleted() {
    return !!this.props.deletedAt
  }

  get id() {
    return this.props.id
  }

  toJSON() {
    return this.props
  }
}