import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './schemas/wishlist.schema';
import { AddItemsDto } from './dto/AddItemsDto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { join } from 'path';
import {
  ApiTagsDecorator,
  ApiOperations,
  ApiCommonResponses,
  ApiParams,
} from '../swagger';
import { WishlistSchema, AddItemsDtoSchema } from '../swagger/schemas';

@ApiTagsDecorator.wishlist()
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperations.getWishlist()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async getWishlist(@Request() req) {
    return this.wishlistService.getWishlist(req.user.entityId);
  }

  @Post('items')
  @ApiOperations.addItem()
  @ApiCommonResponses.createWithAuth(WishlistSchema)
  async addItem(@Request() req, @Body() addItemDto: AddItemsDto) {
    return this.wishlistService.addItem(req.user.entityId, addItemDto);
  }

  @Delete('items/:productId')
  @ApiOperations.removeItem()
  @ApiParams.productId()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async removeItem(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.removeItem(req.user.entityId, productId);
  }

  @Delete()
  @ApiOperations.clearWishlist()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async clearWishlist(@Request() req) {
    return this.wishlistService.clearWishlist(req.user.entityId);
  }

  @Post('addToCart')
  @ApiOperations.addToCart()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async addToCart(@Request() req, @Body() addToCartDto: AddItemsDto) {
    return this.wishlistService.addToCart(req.user.entityId, addToCartDto);
  }
}
