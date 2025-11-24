import type { ReactNode } from 'react'

/**
 * SchemaDetails component
 * Displays detailed information about block references and required fields
 */
export default function SchemaDetails(): ReactNode {
  return (
    <>
      <h3>Schema Details</h3>
      <h4>Block Reference Types</h4>
      <p>
        Block references (used in <code>prerequisites</code> and{' '}
        <code>parents</code>) can be:
      </p>
      <ul>
        <li>
          <strong>Local UUID</strong>: A UUID v4 format identifier for blocks
          within the same course
          <br />
          <code>Example: 550e8400-e29b-41d4-a716-446655440000</code>
        </li>
        <li>
          <strong>External Reference</strong>: Reference to blocks in other
          repositories
          <br />
          <code>
            Format:
            &lt;platform&gt;:&lt;org&gt;/&lt;repo&gt;[/&lt;block-id&gt;][#&lt;ref&gt;]
          </code>
          <br />
          <code>
            Example:
            github:luminastudy/cs-basics/550e8400-e29b-41d4-a716-446655440000#v1.0
          </code>
        </li>
      </ul>
      <h4>Required Fields</h4>
      <ul>
        <li>
          <code>id</code> (string, UUID format): Unique identifier for the block
        </li>
        <li>
          <code>title</code> (object): Multilingual title
          <ul>
            <li>
              <code>he_text</code> (string): Hebrew text
            </li>
            <li>
              <code>en_text</code> (string): English text
            </li>
          </ul>
        </li>
        <li>
          <code>prerequisites</code> (array): Array of prerequisite block
          references
        </li>
        <li>
          <code>parents</code> (array): Array of parent block references
        </li>
      </ul>
    </>
  )
}
