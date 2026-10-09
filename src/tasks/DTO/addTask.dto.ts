import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class AddTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Le titre doir avoir une longueur minimal de 3 caractères',
  })
  title: string;

  @IsNumber()
  @Min(2020)
  @Max(2050)
  year: number;

  @IsString()
  @IsIn(['todo', 'in progress', 'done'])
  status: string;
}
