import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { User } from '../users/entities/user.entity';
import { Register } from '../register/entities/register.entity';
import * as bcrypt from 'bcrypt';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Shipping } from '../shipping/entities/shipping.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Return } from '../returns/entities/return.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
    @InjectRepository(Category)
    private readonly CategoryRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly InventoryRepo: Repository<Inventory>,
    @InjectRepository(Supplier)
    private readonly SupplierRepo: Repository<Supplier>,
    @InjectRepository(Warehouse)
    private readonly WarehouseRepo: Repository<Warehouse>,
    @InjectRepository(Order)
    private readonly OrderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly OrderItemRepo: Repository<OrderItem>,
    @InjectRepository(Shipping)
    private readonly ShippingRepo: Repository<Shipping>,
    @InjectRepository(Payment)
    private readonly PaymentRepo: Repository<Payment>,
    @InjectRepository(Transaction)
    private readonly TransactionRepo: Repository<Transaction>,
    @InjectRepository(Return)
    private readonly ReturnRepo: Repository<Return>,
    @InjectRepository(Register)
    private readonly RegisterRepo: Repository<Register>,
    private readonly dataSource: DataSource,
  ) {}

  async seed() {
    const users = await this.seedUsers();
    const categories = await this.seedCategories();
    const suppliers = await this.seedSuppliers();
    const products = await this.seedProducts(categories, suppliers);
    const warehouses = await this.seedWarehouses();
    const inventories = await this.seedInventories(products, warehouses);
    const orders = await this.seedOrders(users);
    const orderItems = await this.seedOrderItems(orders, products);
    const payments = await this.seedPayments(orders);
    const shippings = await this.seedShippings(orders);
    const returns = await this.seedReturns(orders);
    const transactions = await this.seedTransactions(orders);

    return {
      users,
      categories,
      suppliers,
      products,
      warehouses,
      inventories,
      orders,
      orderItems,
      payments,
      shippings,
      returns,
      transactions,
    };
  }

  async seedUsers(count: number = 10): Promise<User[]> {
    const users = this.UserRepo.create(
      Array.from({ length: count }).map(() => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password', 10),
      })),
    );
    return this.UserRepo.save(users);
  }

  async seedCategories(count = 5): Promise<Category[]> {
    const categories = this.CategoryRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      })),
    );

    return await this.CategoryRepo.save(categories);
  }

  async seedSuppliers(count = 5): Promise<Supplier[]> {
    const suppliers = this.SupplierRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.company.name(),
        contactInfo: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
      })),
    );
    try {
      return await this.SupplierRepo.save(suppliers);
    } catch (err) {
      this.logger.error('Failed to seed suppliers', err);
      return [];
    }
  }

  async seedProducts(
    categories: Category[],
    suppliers: Supplier[],
    count = 10,
  ): Promise<Product[]> {
    if (!categories.length || !suppliers.length) return [];

    const products = this.ProductRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        category: categories[i % categories.length],
        supplier: suppliers[i % suppliers.length],
      })),
    );

    try {
      return await this.ProductRepo.save(products);
    } catch (err) {
      this.logger.error('Failed to seed products', err);
      return [];
    }
  }

  async seedWarehouses(count = 5): Promise<Warehouse[]> {
    const warehouses = this.WarehouseRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.company.name(),
        location: faker.location.streetAddress(),
      })),
    );

    try {
      return await this.WarehouseRepo.save(warehouses);
    } catch (err) {
      this.logger.error('Failed to seed warehouses', err);
      return [];
    }
  }

  async seedInventories(
    products: Product[],
    warehouses: Warehouse[],
    count = 10,
  ): Promise<Inventory[]> {
    if (!products.length || !warehouses.length) return [];

    const inventories = this.InventoryRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        product: products[i % products.length],
        warehouse: warehouses[i % warehouses.length],
        quantity: faker.number.int({ min: 1, max: 100 }),
      })),
    );

    try {
      return await this.InventoryRepo.save(inventories);
    } catch (err) {
      this.logger.error('Failed to seed inventories', err);
      return [];
    }
  }

  async seedOrders(users: User[], count = 10): Promise<Order[]> {
    if (!users.length) return [];

    const orders = this.OrderRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        user: users[i % users.length],
        orderDate: faker.date.recent(),
      })),
    );

    try {
      return await this.OrderRepo.save(orders);
    } catch (err) {
      this.logger.error('Failed to seed orders', err);
      return [];
    }
  }

  async seedOrderItems(
    orders: Order[],
    products: Product[],
    count = 10,
  ): Promise<OrderItem[]> {
    if (!orders.length || !products.length) return [];

    const orderItems = this.OrderItemRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        order: orders[i % orders.length],
        product: products[i % products.length],
        quantity: faker.number.int({ min: 1, max: 5 }),
      })),
    );

    try {
      return await this.OrderItemRepo.save(orderItems);
    } catch (err) {
      this.logger.error('Failed to seed order items', err);
      return [];
    }
  }

  async seedPayments(orders: Order[], count = 10): Promise<Payment[]> {
    if (!orders.length) return [];

    const payments = this.PaymentRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        order: orders[i % orders.length],
        method: faker.finance.transactionType(),
        amount: faker.number.int({ min: 20, max: 500 }),
      })),
    );

    try {
      return await this.PaymentRepo.save(payments);
    } catch (err) {
      this.logger.error('Failed to seed payments', err);
      return [];
    }
  }

  async seedShippings(orders: Order[], count = 10): Promise<Shipping[]> {
    if (!orders.length) return [];

    const shippings = this.ShippingRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        order: orders[i % orders.length],
        address: faker.location.streetAddress(),
      })),
    );

    try {
      return await this.ShippingRepo.save(shippings);
    } catch (err) {
      this.logger.error('Failed to seed shippings', err);
      return [];
    }
  }

  async seedReturns(orders: Order[], count = 5): Promise<Return[]> {
    if (!orders.length) return [];

    const returns = this.ReturnRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        order: orders[i % orders.length],
        reason: faker.lorem.sentence(),
        status: faker.helpers.arrayElement([
          'requested',
          'approved',
          'rejected',
        ]),
      })),
    );

    try {
      return await this.ReturnRepo.save(returns);
    } catch (err) {
      this.logger.error('Failed to seed returns', err);
      return [];
    }
  }

  async seedTransactions(orders: Order[], count = 10): Promise<Transaction[]> {
    if (!orders.length) return [];

    const transactions = this.TransactionRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        order: orders[i % orders.length],
        type: faker.finance.transactionType(),
        amount: faker.number.int({ min: 10, max: 500 }),
      })),
    );

    try {
      return await this.TransactionRepo.save(transactions);
    } catch (err) {
      this.logger.error('Failed to seed transactions', err);
      return [];
    }
  }
}
