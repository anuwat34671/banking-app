import { PartialType } from '@nestjs/mapped-types';
import { SignUpDTO } from './signup-dto';

export class UpdateCustomerDTO extends PartialType(SignUpDTO) {}
