import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Category, Product, ProductRate } from '../entities/entities';
import { ProductViewDto } from '../entities/dto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'product-app';

  categories:Category[] = [
    {
      id:1,
      name:"Arçelik",
    }
  ];

  products:Product[] = [
    {
      id:1,
      categoryId:1,
      name:"Buzdolabı",
      price:100
    }
  ];

  productRates:ProductRate[] = [
    {
      id:1,
      productId:1,
      rate:4,
    },
    {
      id:1,
      productId:1,
      rate:3,
    }
  ];

  getProductWithRateList():ProductViewDto[] {
    let productViewList:ProductViewDto[] = this.products.map(product=> {
      let productRates = this.productRates.filter(rate=>rate.productId==product.id);
      return {
        id:product.id,
        name:product.name,
        categoryId:product.categoryId,
        price:product.price,
        categoryName:this.categories.find(category=>category.id==product.id)?.name,
        rate:productRates.map(productRate=>productRate.rate).reduce((num1,num2)=>num1+num2,0) / productRates.length,
        rateCount:productRates.length
      };
    })
    return productViewList;
  }

}
