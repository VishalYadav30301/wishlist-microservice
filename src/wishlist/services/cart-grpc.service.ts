import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CartService } from './cart-grpc.interface';

@Injectable()
export class CartGrpcService {
  private readonly logger = new Logger(CartGrpcService.name);
  private cartService: CartService;

  constructor(@Inject('CART_PACKAGE') private client: ClientGrpc) {
    try {
      this.logger.log('Initializing CartGrpcService...');
      this.logger.log(`CART_SERVICE_URL: ${process.env.CART_SERVICE_URL}`);
      this.cartService = this.client.getService<CartService>('CartService');
      this.logger.log('CartService successfully initialized with service name: CartService');
    } catch (error) {
      this.logger.error(`Failed to initialize CartService: ${error.message}`, error.stack);
      throw error;
    }
  }

  addToCart(userId: string, items: Array<{ productId: string; quantity: number }>) {
    console.log(items);
    const transformedItems = items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      description: '',
      color: '',
      size: '',
      price: 0
    }));
    return this.cartService.addToCart({
      userId,
      items: transformedItems
    });
  }
} 