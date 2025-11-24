import type { ReactNode } from 'react'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import Translate from '@docusaurus/Translate'
import styles from './styles.module.css'

interface FeatureItem {
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  title: ReactNode
  description: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    Svg: require('@site/static/img/logo.svg').default,
    title: (
      <Translate id="homepage.feature1.title" description="Title of feature 1">
        Personalized Learning
      </Translate>
    ),
    description: (
      <Translate
        id="homepage.feature1.description"
        description="Description of feature 1"
      >
        Custom roadmaps tailored to your educational goals. Navigate complex
        curricula with clear, visual learning paths.
      </Translate>
    ),
  },
  {
    Svg: require('@site/static/img/logo.svg').default,
    title: (
      <Translate id="homepage.feature2.title" description="Title of feature 2">
        Block-Based Visualization
      </Translate>
    ),
    description: (
      <Translate
        id="homepage.feature2.description"
        description="Description of feature 2"
      >
        Interactive block graphs show course structure, prerequisites, and
        relationships. Understand your learning journey at a glance.
      </Translate>
    ),
  },
  {
    Svg: require('@site/static/img/logo.svg').default,
    title: (
      <Translate id="homepage.feature3.title" description="Title of feature 3">
        Multi-Language Support
      </Translate>
    ),
    description: (
      <Translate
        id="homepage.feature3.description"
        description="Description of feature 3"
      >
        Full support for English, Hebrew, and Spanish with proper RTL/LTR
        handling. Learn in your preferred language.
      </Translate>
    ),
  },
]

function Feature({ Svg, title, description }: FeatureItem) {
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
