import { DomainError } from './domain.error'

export class ProductNotFoundError extends DomainError {
  readonly code = 'PRODUCT_NOT_FOUND'
  readonly statusCode = 404

  constructor(id: string) {
    super(`Product with id ${id} not found`)
  }
}

export class ProductAlreadyExistsError extends DomainError {
  readonly code = 'PRODUCT_ALREADY_EXISTS'
  readonly statusCode = 409

  constructor(name: string) {
    super(`Product with name "${name}" already exists`)
  }
}

export class MissingRequiredFieldsError extends DomainError {
  readonly code = 'MISSING_REQUIRED_FIELDS'
  readonly statusCode = 400

  constructor(fields: string[]) {
    super(`Missing required fields: ${fields.join(', ')}`)
  }
}