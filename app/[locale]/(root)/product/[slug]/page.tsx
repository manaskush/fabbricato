import { auth } from '@/auth'
import AddToCart from '@/components/shared/product/add-to-cart'
import { Card, CardContent } from '@/components/ui/card'
import { getProductBySlug, getRelatedProductsByCategory } from '@/lib/actions/product.actions'
import ReviewList from './review-list'
import { generateId, round2 } from '@/lib/utils'
import SelectVariant from '@/components/shared/product/select-variant'
import ProductPrice from '@/components/shared/product/product-price'
import ProductGallery from '@/components/shared/product/product-gallery'
import AddToBrowsingHistory from '@/components/shared/product/add-to-browsing-history'
import { Separator } from '@/components/ui/separator'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import RatingSummary from '@/components/shared/product/rating-summary'
import ProductSlider from '@/components/shared/product/product-slider'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getTranslations()
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: t('Product.Product not found') }
  return { title: product.name, description: product.description }
}

export default async function ProductDetails({ 
  params,
  searchParams 
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page: string; color: string; size: string }>
}) {
  const { page, color, size } = await searchParams
  const { slug } = await params
  const session = await auth()
  const product = await getProductBySlug(slug)
  const relatedProducts = await getRelatedProductsByCategory({
    category: product.category,
    productId: product._id,
    page: Number(page || '1'),
  })
  const t = await getTranslations()

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
      <AddToBrowsingHistory id={product._id} category={product.category} />
      
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Left Column - Gallery */}
        <div className="space-y-8">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white">
            <ProductGallery images={product.images} />
          </div>
          
          {/* <div className="grid grid-cols-4 gap-6">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl overflow-hidden bg-white border-2 border-gray-100 hover:border-blue-500 transition-all"
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div> */}
        </div>

        {/* Right Column - Product Info */}
        <div className="flex flex-col gap-12">
          {/* Product Header */}
          <div className="space-y-6">
            <span className="inline-flex px-6 py-2 text-sm font-medium rounded-full bg-blue-50 text-blue-700">
              {product.brand} · {product.category}
            </span>
            
            <h1 className="text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <RatingSummary
              avgRating={product.avgRating}
              numReviews={product.numReviews}
              asPopover
              ratingDistribution={product.ratingDistribution}
            />

            <ProductPrice
              price={product.price}
              listPrice={product.listPrice}
              isDeal={product.tags.includes('todays-deal')}
              forListing={false}
              className="text-2xl"
            />
          </div>

          <Separator className="bg-gray-100" />

          {/* Variants & Purchase */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <SelectVariant
                product={product}
                size={size || product.sizes[0]}
                color={color || product.colors[0]}
              />
            </div>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 space-y-6">
                {product.countInStock > 0 && product.countInStock <= 3 && (
                  <div className="text-red-600 font-medium bg-red-50 px-6 py-3 rounded-xl text-sm">
                    {t('Product.Only X left in stock - order soon', {
                      count: product.countInStock,
                    })}
                  </div>
                )}

                <div className={`px-6 py-3 rounded-xl text-center font-medium ${
                  product.countInStock !== 0 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {product.countInStock !== 0 
                    ? t('Product.In Stock')
                    : t('Product.Out of Stock')
                  }
                </div>

                {product.countInStock !== 0 && (
                  <AddToCart
                    item={{
                      clientId: generateId(),
                      product: product._id,
                      countInStock: product.countInStock,
                      name: product.name,
                      slug: product.slug,
                      category: product.category,
                      price: round2(product.price),
                      quantity: 1,
                      image: product.images[0],
                      size: size || product.sizes[0],
                      color: color || product.colors[0],
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t('Product.Description')}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-8 mb-24" id="reviews">
        <h2 className="text-3xl font-bold text-gray-900">
          {t('Product.Customer Reviews')}
        </h2>
        <ReviewList product={product} userId={session?.user.id} />
      </div>

      {/* Related Products */}
      <div className="mb-24">
        <ProductSlider
          products={relatedProducts.data}
          title={t('Product.Best Sellers in', { name: product.category })}
        />
      </div>

      {/* Browsing History */}
      <BrowsingHistoryList className="mb-12" />
    </div>
  );
}