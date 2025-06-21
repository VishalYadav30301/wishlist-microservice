import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class AddItemsDto {
  @ApiProperty({
    description: 'Product ID'
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product'
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
} 