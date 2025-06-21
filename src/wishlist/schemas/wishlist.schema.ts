import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class WishlistItem {
  @ApiProperty({
    description: 'Product ID'
  })
  @Prop({ required: true })
  productId: string;

  @ApiProperty({
    description: 'Name of the product'
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Price of the product'
    })
  @Prop({ required: true })
  price: number;
  
  @ApiProperty({
    description: 'Image URL of the product'
  })
  @Prop()
  image?: string;

  @ApiProperty({
    description: 'Category of the product'
  })
  @Prop()
  category?: string;

  @ApiProperty({
    description: 'Description of the product'
  })
  @Prop()
  description?: string;

  @ApiProperty({
    description: 'Variants of the product'
  })
  @Prop({ type: [Object], default: [] })
  variants?: any[];

  @ApiProperty({
    description: 'Total stock of the product'
  })
  @Prop()
  totalStock?: number;

  @ApiProperty({
    description: 'Reviews of the product'
  })
  @Prop({ type: [Object], default: [] })
  reviews?: any[];
}

@Schema({ timestamps: true })
export class Wishlist {
  @ApiProperty({
    description: 'User ID'
  })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({
    description: 'Items in the wishlist'
  })
  @Prop({ type: [WishlistItem], default: [] })
  items: WishlistItem[];

  @ApiProperty({
    description: 'Creation timestamp'
  })
  createdAt?: string;

  @ApiProperty({
    description: 'Last update timestamp'
    })
  updatedAt?: string;
}

export type WishlistDocument = Wishlist & Document;
export const WishlistSchema = SchemaFactory.createForClass(Wishlist);