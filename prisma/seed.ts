import { PrismaClient, ProductCategory } from '@prisma/client';

const prisma = new PrismaClient();

const seedProducts = [
  {
    name: 'House Blend',
    slug: 'house-blend',
    sku: 'LULA-COF-001',
    description: 'Smooth everyday roast.',
    priceCents: 1499,
    category: ProductCategory.coffee,
    inStock: true,
  },
  {
    name: 'Organic Sunrise',
    slug: 'organic-sunrise',
    sku: 'LULA-ORG-001',
    description: 'Certified organic single origin.',
    priceCents: 1899,
    category: ProductCategory.organic_coffee,
    inStock: true,
  },
  {
    name: 'Ceramic Mug',
    slug: 'ceramic-mug',
    sku: 'LULA-MUG-001',
    description: '12oz matte ceramic mug.',
    priceCents: 2200,
    category: ProductCategory.mugs,
    inStock: true,
  },
  {
    name: 'Earl Grey Loose Leaf',
    slug: 'earl-grey-loose-leaf',
    sku: 'LULA-TEA-001',
    description: 'Classic bergamot black tea.',
    priceCents: 1299,
    category: ProductCategory.tea,
    inStock: true,
  },
];

async function main() {
  for (const product of seedProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
