import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from './home.module.scss'
import {SubscribeButton} from '../Components/SubscribeButton/index'
import { stripe } from '../Components/services/stripe'


interface HomeProps {
  product: {
    priceId: string;
    amount : number; 
  }
}

export default function Home({ product }: HomeProps ) {
  return( 
    <>
  <Head>
    <title> Home | ig.news</title>
  </Head>

   <main className={styles.contentContainer}>
     <section className={styles.hero}>
     <span> 👏 Hey,welcome</span>
     <h1>News about the <span>React </span>world.</h1>
     <p>
       Get acess to all the publicaction <br />
       <span>for {product.amount} month</span>
     </p>
     <SubscribeButton />
     </section>
     <img src="/images/avatar.svg" alt="girl coding" />
   </main>
    </>
  )
}

export const getStaticProps : GetStaticProps = async() =>{
  const price = await stripe.prices.retrieve('price_1L1b0fKl6X3Z4BWziunXuBpu',{
    expand: ['product']
    
      })
      const product ={
        priceId: price.id,
        amount: new Intl.NumberFormat('en-US',{
          style: 'currency',
          currency: 'USD',
        }).format(price.unit_amount /100),
      };

  return{
    props: {
      product
    },
    revalidate: 60 * 60 *  24 // 24 hours 
  }
}
