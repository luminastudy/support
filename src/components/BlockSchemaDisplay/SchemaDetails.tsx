import type { ReactNode } from 'react'
import styles from './styles.module.css'

/**
 * SchemaDetails component
 * Displays detailed information about block references and required fields
 */
export default function SchemaDetails(): ReactNode {
  return (
    <>
      <h3 className={styles.detailsHeading}>Schema Details</h3>
      <h4 className={styles.detailsSubheading}>Block Reference Types</h4>
      <p className={styles.detailsParagraph}>
        Block references (used in{' '}
        <code className={styles.detailsCode}>prerequisites</code> and{' '}
        <code className={styles.detailsCode}>parents</code>) can be:
      </p>
      <ul className={styles.detailsList}>
        <li className={styles.detailsListItem}>
          <strong className={styles.detailsStrong}>Local UUID</strong>: A UUID
          v4 format identifier for blocks within the same course
          <br className={styles.detailsLineBreak} />
          <code className={styles.detailsCode}>
            Example: 550e8400-e29b-41d4-a716-446655440000
          </code>
        </li>
        <li className={styles.detailsListItem}>
          <strong className={styles.detailsStrong}>External Reference</strong>:
          Reference to blocks in other repositories
          <br className={styles.detailsLineBreak} />
          <code className={styles.detailsCode}>
            Format:
            &lt;platform&gt;:&lt;org&gt;/&lt;repo&gt;[/&lt;block-id&gt;][#&lt;ref&gt;]
          </code>
          <br className={styles.detailsLineBreak} />
          <code className={styles.detailsCode}>
            Example:
            github:luminastudy/cs-basics/550e8400-e29b-41d4-a716-446655440000#v1.0
          </code>
        </li>
      </ul>
      <h4 className={styles.detailsSubheading}>Required Fields</h4>
      <ul className={styles.detailsList}>
        <li className={styles.detailsListItem}>
          <code className={styles.detailsCode}>id</code> (string, UUID format):
          Unique identifier for the block
        </li>
        <li className={styles.detailsListItem}>
          <code className={styles.detailsCode}>title</code> (object):
          Multilingual title
          <ul className={styles.detailsNestedList}>
            <li className={styles.detailsListItem}>
              <code className={styles.detailsCode}>he_text</code> (string):
              Hebrew text
            </li>
            <li className={styles.detailsListItem}>
              <code className={styles.detailsCode}>en_text</code> (string):
              English text
            </li>
          </ul>
        </li>
        <li className={styles.detailsListItem}>
          <code className={styles.detailsCode}>prerequisites</code> (array):
          Array of prerequisite block references
        </li>
        <li className={styles.detailsListItem}>
          <code className={styles.detailsCode}>parents</code> (array): Array of
          parent block references
        </li>
      </ul>
    </>
  )
}
