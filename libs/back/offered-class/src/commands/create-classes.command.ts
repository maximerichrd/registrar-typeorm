import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min, ValidateNested } from 'class-validator';

export class OfferedClassDto {
  @ApiProperty()
  @IsInt()
  code!: number;

  @ApiProperty()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(50)
  hours!: number;
}

export class OfferedClassesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => OfferedClassDto)
  @ApiProperty({ type: [OfferedClassDto] })
  classes!: OfferedClassDto[];
}

