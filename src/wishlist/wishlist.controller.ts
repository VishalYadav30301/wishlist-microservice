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
import { AddItemsDto } from './dto/AddItemsDto';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
  ApiTagsDecorator,
  ApiOperations,
  ApiCommonResponses,
  ApiParams,
} from '../swagger';
import { WishlistSchema, AddItemsDtoSchema } from '../swagger/schemas';
import { CustomLoggerService } from '../common/logger';

@ApiTagsDecorator.wishlist()
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Get()
  @ApiOperations.getWishlist()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async getWishlist(@Request() req) {
    this.logger.log('Getting wishlist for user', {
      service: 'wishlist-service',
      method: 'WishlistController.getWishlist',
      userId: req.user.entityId,
      requestId: (req as any).requestId,
    });

    const result = await this.wishlistService.getWishlist(req.user.entityId);
    
    this.logger.log('Wishlist retrieved successfully', {
      service: 'wishlist-service',
      method: 'WishlistController.getWishlist',
      userId: req.user.entityId,
      requestId: (req as any).requestId,
      itemCount: result?.items?.length || 0,
    });

    return result;
  }

  @Post('items')
  @ApiOperations.addItem()
  @ApiCommonResponses.createWithAuth(WishlistSchema)
  async addItem(@Request() req, @Body() addItemDto: AddItemsDto) {
    this.logger.log('Adding item to wishlist', {
      service: 'wishlist-service',
      method: 'WishlistController.addItem',
      userId: req.user.entityId,
      requestId: (req as any).requestId,
      productId: addItemDto.productId,
    });

    const result = await this.wishlistService.addItem(req.user.entityId, addItemDto);
    
    this.logger.logBusinessEvent('Item added to wishlist', {
      userId: req.user.entityId,
      productId: addItemDto.productId,
      newItemCount: result?.items?.length || 0,
    }, {
      service: 'wishlist-service',
      method: 'WishlistController.addItem',
      requestId: (req as any).requestId,
    });

    return result;
  }

  @Delete('items/:productId')
  @ApiOperations.removeItem()
  @ApiParams.productId()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async removeItem(@Request() req, @Param('productId') productId: string) {
    this.logger.log('Removing item from wishlist', {
      service: 'wishlist-service',
      method: 'WishlistController.removeItem',
      userId: req.user.entityId,
      requestId: (req as any).requestId,
      productId,
    });

    const result = await this.wishlistService.removeItem(req.user.entityId, productId);
    
    this.logger.logBusinessEvent('Item removed from wishlist', {
      userId: req.user.entityId,
      productId,
      newItemCount: result?.items?.length || 0,
    }, {
      service: 'wishlist-service',
      method: 'WishlistController.removeItem',
      requestId: (req as any).requestId,
    });

    return result;
  }

  @Delete()
  @ApiOperations.clearWishlist()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async clearWishlist(@Request() req) {
    this.logger.log('Clearing wishlist', {
      service: 'wishlist-service',
      method: 'WishlistController.clearWishlist',
      userId: req.user.entityId,
      requestId: (req as any).requestId,
    });

    const result = await this.wishlistService.clearWishlist(req.user.entityId);
    
    this.logger.logBusinessEvent('Wishlist cleared', {
      userId: req.user.entityId,
      previousItemCount: result?.items?.length || 0,
    }, {
      service: 'wishlist-service',
      method: 'WishlistController.clearWishlist',
      requestId: (req as any).requestId,
    });

    return result;
  }

  @Post('addToCart')
  @ApiOperations.addToCart()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async addToCart(@Request() req, @Body() addToCartDto: AddItemsDto) {
    this.logger.log('Adding item to cart from wishlist', {
      service: 'wishlist-service',
      method: 'WishlistController.addToCart',
      userId: req.user.entityId,
      requestId: (req as any).requestId,
      productId: addToCartDto.productId,
    });

    const result = await this.wishlistService.addToCart(req.user.entityId, addToCartDto);
    
    this.logger.logBusinessEvent('Item moved from wishlist to cart', {
      userId: req.user.entityId,
      productId: addToCartDto.productId,
      remainingItemCount: result?.items?.length || 0,
    }, {
      service: 'wishlist-service',
      method: 'WishlistController.addToCart',
      requestId: (req as any).requestId,
    });

    return result;
  }
}
