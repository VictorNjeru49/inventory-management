import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { User } from '../users/entities/user.entity';
import { Register, UserRole } from '../register/entities/register.entity';
import * as bcrypt from 'bcrypt';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Shipping, ShippingStatus } from '../shipping/entities/shipping.entity';
import { Payment, PaymentMethod } from '../payments/entities/payment.entity';
import { Return } from '../returns/entities/return.entity';
import {
  Transaction,
  TransactionType,
} from '../transactions/entities/transaction.entity';

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
    const warehouses = await this.seedWarehouses();
    const products = await this.seedProducts(categories, suppliers, warehouses);
    const inventories = await this.seedInventories(products, warehouses);
    const orders = await this.seedOrders(users);
    const orderItems = await this.seedOrderItems(orders, products);
    const transactions = await this.seedTransactions(orders, users);
    const payments = await this.seedPayments(orders, transactions);
    const shippings = await this.seedShippings(orders);
    const returns = await this.seedReturns(orders, users, products);
    const registers = await this.seedRegisters(users);

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
      registers,
    };
  }

  async seedUsers(count: number = 10): Promise<User[]> {
    const users = this.UserRepo.create(
      Array.from({ length: count }).map(() => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password', 10),
        role: faker.helpers.arrayElement(Object.values(UserRole)),
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
    return await this.SupplierRepo.save(suppliers);
  }

  async seedProducts(
    categories: Category[],
    suppliers: Supplier[],
    warehouses: Warehouse[],
    count = 10,
  ): Promise<Product[]> {
    if (!categories.length || !suppliers.length || !warehouses.length)
      return [];

    const products = this.ProductRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        category: categories[i % categories.length],
        supplier: suppliers[i % suppliers.length],
        warehouse: warehouses[i % warehouses.length],
        sku: faker.string.fromCharacters('ABC', { min: 5, max: 10 }),
        stockQuantity: faker.number.int({ min: 1, max: 100 }),
      })),
    );

    return await this.ProductRepo.save(products);
  }

  async seedWarehouses(count = 5): Promise<Warehouse[]> {
    const warehouses = this.WarehouseRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.company.name(),
        location: faker.location.streetAddress(),
        contactEmail: faker.internet.email(),
      })),
    );
    return await this.WarehouseRepo.save(warehouses);
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
        stockQty: faker.number.int({ min: 1, max: 100 }),
      })),
    );
    return await this.InventoryRepo.save(inventories);
  }

  async seedOrders(users: User[], count = 10): Promise<Order[]> {
    if (!users.length) return [];

    const orders = this.OrderRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        user: users[i % users.length],
        totalPrice: parseFloat(faker.commerce.price()),
        status: faker.helpers.arrayElement(Object.values(OrderStatus)),
      })),
    );
    return await this.OrderRepo.save(orders);
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
        price: parseFloat(faker.commerce.price()),
        totalPrice:
          parseFloat(faker.commerce.price()) *
          faker.number.int({ min: 1, max: 5 }),
      })),
    );
    return await this.OrderItemRepo.save(orderItems);
  }

  async seedPayments(
    orders: Order[],
    transactions: Transaction[],
    count = 10,
  ): Promise<Payment[]> {
    if (!orders.length) return [];

    const payments = this.PaymentRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        order: orders[i % orders.length],
        transaction: transactions[i % transactions.length],
        amount: parseFloat(faker.commerce.price()),
        paymentMethod: faker.helpers.arrayElement(Object.values(PaymentMethod)),
      })),
    );
    return await this.PaymentRepo.save(payments);
  }

  async seedShippings(orders: Order[], count = 10): Promise<Shipping[]> {
    if (!orders.length) return [];

    const shippings = this.ShippingRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        order: orders[i % orders.length],
        trackingNumber: faker.string.uuid(),
        status: faker.helpers.arrayElement(Object.values(ShippingStatus)),
      })),
    );
    return await this.ShippingRepo.save(shippings);
  }

  async seedRegisters(users: User[], count: number = 10): Promise<Register[]> {
    if (!users.length) return [];

    const registers = this.RegisterRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        email: users[i % users.length].email,
        password: 'password',
        user: users[i % users.length],
        role: faker.helpers.arrayElement(Object.values(UserRole)),
      })),
    );

    return await this.RegisterRepo.save(registers);
  }

  async seedReturns(
    orders: Order[],
    users: User[],
    products: Product[],
    count = 10,
  ): Promise<Return[]> {
    if (!orders.length || !users.length || !products.length) return [];

    const returns = this.ReturnRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        quantity: faker.number.int({ min: 1, max: 5 }),
        order: orders[i % orders.length],
        user: users[i % users.length],
        product: products[i % products.length],
        returnReason: faker.lorem.sentence(),
      })),
    );

    return await this.ReturnRepo.save(returns);
  }

  async seedTransactions(
    orders: Order[],
    user: User[],
    count = 10,
  ): Promise<Transaction[]> {
    if (!orders.length) return [];

    const transactions = this.TransactionRepo.create(
      Array.from({ length: count }).map((_, i) => ({
        order: orders[i % orders.length],
        quantity: faker.number.int({ min: 1, max: 5 }),
        user: user[i % user.length],
        transaction_type: faker.helpers.arrayElement(
          Object.values(TransactionType),
        ),
      })),
    );
    return await this.TransactionRepo.save(transactions);
  }
}
