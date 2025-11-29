import type { ReactNode } from 'react'
import blockSchema from '@lumina-study/block-schema'
import SchemaDetails from './SchemaDetails'
import { NPM_PACKAGE_URL } from './constants'
import styles from './styles.module.css'

// Example follows the schema's required properties
const schemaExample = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  title: { he_text: 'כותרת בעברית', en_text: 'English title' },
  prerequisites: [],
  parents: [],
}

/**
 * BlockSchemaDisplay component
 * Displays the Block Schema from @lumina-study/block-schema package
 * Uses the default export which always points to the latest schema version
 */
export default function BlockSchemaDisplay(): ReactNode {
  const schemaVersion = blockSchema.version
  const schemaDescription = blockSchema.description

  return (
    <div className={styles.schemaContainer}>
      <p className={styles.schemaDescription}>
        Courses follow the{' '}
        <code className={styles.detailsCode}>@lumina-study/block-schema</code>{' '}
        specification (version {schemaVersion}):
      </p>
      <p className={styles.schemaDescription}>
        <em className={styles.schemaEmphasis}>{schemaDescription}</em>
      </p>
      <pre className={styles.schemaPreBlock}>
        <code className={styles.schemaCodeBlock}>
          {JSON.stringify(schemaExample, null, 2)}
        </code>
      </pre>
      <details className={styles.schemaDetailsBlock}>
        <summary className={styles.schemaSummary}>
          <strong className={styles.schemaSummaryTitle}>
            View Full JSON Schema
          </strong>
        </summary>
        <pre className={styles.schemaPreBlock}>
          <code className={styles.schemaCodeBlock}>
            {JSON.stringify(blockSchema, null, 2)}
          </code>
        </pre>
      </details>
      <SchemaDetails />
      <p className={styles.schemaFooter}>
        <small className={styles.schemaFooterText}>
          Schema version: {schemaVersion} |{' '}
          <a
            className={styles.schemaLink}
            href={NPM_PACKAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on npm
          </a>
        </small>
      </p>
    </div>
  )
}
