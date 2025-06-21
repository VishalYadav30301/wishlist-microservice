import { Observable } from 'rxjs';

export interface CartService {
  addToCart(request: {
    userId: string;
    items: Array<{
      productId: string;
      description: string;
      color: string;
      size: string;
      quantity: number;
      price: number;
    }>;
  }): Observable<{
    items: Array<{
      productId: string;
      description: string;
      color: string;
      size: string;
      quantity: number;
      price: number;
    }>;
  }>;
} 