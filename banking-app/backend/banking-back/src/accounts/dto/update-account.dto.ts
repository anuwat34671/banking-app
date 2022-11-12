import { PartialType } from '@nestjs/Mapped-Types';
import { CreateAccountDTO } from './create-account.dto';

export class UpdateAccountDTO extends PartialType(CreateAccountDTO) {
}