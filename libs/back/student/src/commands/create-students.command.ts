import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, Max, Min, ValidateNested } from 'class-validator';

export class StudentDto {
  @ApiProperty()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @Min(1980)
  @Max(2023)
  entered!: number;

  @ApiProperty()
  @Min(1)
  @Max(11)
  grade!: number;
}

export class StudentsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  @ApiProperty({ type: [StudentDto] })
  students!: StudentDto[];
}

