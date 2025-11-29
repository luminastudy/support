import type { ReactNode } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import Translate, { translate } from '@docusaurus/Translate'
import styles from './index.module.css'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            <Translate
              id="homepage.getStarted"
              description="The get started button text"
            >
              Get Started
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  const title = translate({
    id: 'homepage.title',
    message: 'Hello from Lumina Study',
    description: 'The homepage title',
  })
  return (
    <Layout
      title={title}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main className={styles.mainContent}>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
