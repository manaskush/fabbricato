'use client'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import ProductPrice from '@/components/shared/product/product-price'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCartStore from '@/hooks/use-cart-store'
import useSettingStore from '@/hooks/use-setting-store'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CartPage() {
  const {
    cart: { items, itemsPrice },
    updateItem,
    removeItem,
  } = useCartStore()
  const router = useRouter()
  const {
    setting: {
      site,
      common: { freeShippingMinPrice },
    },
  } = useSettingStore()

  const t = useTranslations()
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {items.length === 0 ? (
          <Card className='col-span-4 rounded-lg shadow-lg'>
            <CardHeader className='text-3xl font-bold text-center py-8'>
              {t('Cart.Your Shopping Cart is empty')}
            </CardHeader>
            <CardContent className='text-center pb-8'>
              {t.rich('Cart.Continue shopping on', {
                name: site.name,
                home: (chunks) => (
                  <Link href='/' className='text-blue-600 hover:underline'>
                    {chunks}
                  </Link>
                ),
              })}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className='col-span-3'>
              <Card className='rounded-lg shadow-lg'>
                <CardHeader className='text-3xl font-bold pb-4'>
                  {t('Cart.Shopping Cart')}
                </CardHeader>
                <CardContent className='p-6'>
                  <div className='flex justify-end border-b pb-4 mb-6 text-lg font-semibold'>
                    {t('Cart.Price')}
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.clientId}
                      className='flex flex-col md:flex-row justify-between items-center py-6 border-b gap-6 hover:bg-gray-50 transition-colors duration-200'
                    >
                      <Link href={`/product/${item.slug}`} className='flex-shrink-0'>
                        <div className='relative w-40 h-40'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes='20vw'
                            className='object-contain'
                          />
                        </div>
                      </Link>

                      <div className='flex-1 space-y-4'>
                        <Link
                          href={`/product/${item.slug}`}
                          className='text-lg font-semibold hover:text-blue-600 transition-colors duration-200'
                        >
                          {item.name}
                        </Link>
                        <div className='space-y-2'>
                          <p className='text-sm'>
                            <span className='font-bold'>
                              {t('Cart.Color')}:
                            </span>{' '}
                            {item.color}
                          </p>
                          <p className='text-sm'>
                            <span className='font-bold'>
                              {t('Cart.Size')}:
                            </span>{' '}
                            {item.size}
                          </p>
                        </div>
                        <div className='flex gap-4 items-center'>
                          <Select
                            value={item.quantity.toString()}
                            onValueChange={(value) =>
                              updateItem(item, Number(value))
                            }
                          >
                            <SelectTrigger className='w-24'>
                              <SelectValue>
                                {t('Cart.Quantity')}: {item.quantity}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent position='popper'>
                              {Array.from({
                                length: item.countInStock,
                              }).map((_, i) => (
                                <SelectItem key={i + 1} value={`${i + 1}`}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant={'outline'}
                            onClick={() => removeItem(item)}
                            className='hover:bg-red-50 hover:text-red-600 transition-colors duration-200'
                          >
                            {t('Cart.Delete')}
                          </Button>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='text-lg'>
                          {item.quantity > 1 && (
                            <>
                              {item.quantity} x
                              <ProductPrice price={item.price} plain />
                              <br />
                            </>
                          )}

                          <span className='font-bold text-xl'>
                            <ProductPrice
                              price={item.price * item.quantity}
                              plain
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className='flex justify-end text-xl font-semibold my-6'>
                    {t('Cart.Subtotal')} (
                    {items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    {t('Cart.Items')}):{' '}
                    <span className='font-bold ml-2'>
                      <ProductPrice price={itemsPrice} plain />
                    </span>{' '}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className='rounded-lg shadow-lg'>
                <CardContent className='py-6 space-y-6'>
                  {itemsPrice < freeShippingMinPrice ? (
                    <div className='text-sm'>
                      {t('Cart.Add')}{' '}
                      <span className='text-green-700 font-semibold'>
                        <ProductPrice
                          price={freeShippingMinPrice - itemsPrice}
                          plain
                        />
                      </span>{' '}
                      {t(
                        'Cart.of eligible items to your order to qualify for FREE Shipping'
                      )}
                    </div>
                  ) : (
                    <div className='text-sm'>
                      <span className='text-green-700 font-semibold'>
                        {t('Cart.Your order qualifies for FREE Shipping')}
                      </span>{' '}
                      {t('Cart.Choose this option at checkout')}
                    </div>
                  )}
                  <div className='text-xl font-semibold'>
                    {t('Cart.Subtotal')} (
                    {items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    {t('Cart.items')}):{' '}
                    <span className='font-bold'>
                      <ProductPrice price={itemsPrice} plain />
                    </span>{' '}
                  </div>
                  <Button
                    onClick={() => router.push('/checkout')}
                    className='rounded-full w-full py-6 text-lg font-semibold bg-gray-300 hover:bg-gray-500 transition-colors duration-200'
                  >
                    {t('Cart.Proceed to Checkout')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
      <BrowsingHistoryList className='mt-10' />
    </div>
  )
}