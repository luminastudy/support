import type { ReactNode } from 'react'
import blockSchema from '@lumina-study/block-schema'
import SchemaDetails from './SchemaDetails'
import { NPM_PACKAGE_URL } from './constants'
import styles from './styles.module.css'

/**
 * BlockSchemaDisplay component
 * Displays the Block Schema from @lumina-study/block-schema package
 * Uses the default export which always points to the latest schema version
 */
export default function BlockSchemaDisplay(): ReactNode {
  // Generate example based on the actual schema
  const schemaExample = {
    id: 'uuid-format-or-external-reference',
    title: {
      he_text: 'Hebrew title',
      en_text: 'English title',
    },
    prerequisites: ['prerequisite-block-id (UUID or external reference)'],
    parents: ['parent-block-id (UUID or external reference)'],
  }

  const schemaVersion = blockSchema.version
  const schemaDescription = blockSchema.description

  return (
    <div className={styles.schemaContainer}>
      <p>
        Courses follow the <code>@lumina-study/block-schema</code> specification
        (version {schemaVersion}):
      </p>
      <p>
        <em>{schemaDescription}</em>
      </p>
      <pre>
        <code>{JSON.stringify(schemaExample, null, 2)}</code>
      </pre>
      <details>
        <summary>
          <strong>View Full JSON Schema</strong>
        </summary>
        <pre>
          <code>{JSON.stringify(blockSchema, null, 2)}</code>
        </pre>
      </details>
      <SchemaDetails />
      <p>
        <small>
          Schema version: {schemaVersion} |{' '}
          <a href={NPM_PACKAGE_URL} target="_blank" rel="noopener noreferrer">
            View on npm
          </a>
        </small>
      </p>
    </div>
  )
}
