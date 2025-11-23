import type { ReactNode } from 'react'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

interface FeatureItem {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Personalized Learning',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Custom roadmaps tailored to your educational goals. Navigate complex
        curricula with clear, visual learning paths.
      </>
    ),
  },
  {
    title: 'Block-Based Visualization',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Interactive block graphs show course structure, prerequisites, and
        relationships. Understand your learning journey at a glance.
      </>
    ),
  },
  {
    title: 'Multi-Language Support',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Full support for English, Hebrew, and Spanish with proper RTL/LTR
        handling. Learn in your preferred language.
      </>
    ),
  },
]

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
