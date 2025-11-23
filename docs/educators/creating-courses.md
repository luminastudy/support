---
sidebar_position: 1
---

# Creating Courses

Learn how to create and publish courses on the Lumina Study platform.

## Prerequisites

Before creating a course, you need:

- A Lumina Study educator account
- Course content prepared (syllabus, structure, materials)
- Understanding of block-based course structure

## Course Creation Process

### 1. Initialize Course

Start by providing basic information:

- **Course Name** - Clear, descriptive title
- **Institution** - Your university or organization
- **Language** - Primary language of instruction
- **Description** - Brief overview of course content

### 2. Define Course Structure

Create the course structure using blocks:

- **Blocks** - Individual units or topics
- **Prerequisites** - Define what students must know first
- **Parent Relationships** - Organize blocks hierarchically

### 3. Configure Blocks

For each block, specify:

- **Title** - In all supported languages (Hebrew and English required)
- **Content** - Learning materials, resources, links
- **Prerequisites** - Other blocks that must be completed first
- **Parent Blocks** - Higher-level organizational blocks

## Block Schema

Courses follow the `@lumina-study/block-schema` specification:

```json
{
  "id": "unique-uuid",
  "title": {
    "he_text": "Hebrew title",
    "en_text": "English title"
  },
  "prerequisites": ["prerequisite-block-id"],
  "parents": ["parent-block-id"]
}
```

## Publishing Workflow

### Draft Mode

While creating your course:

- Save progress without publishing
- Preview how students will see it
- Test prerequisite logic
- Validate all required fields

### Publishing

When ready to publish:

1. Review all course content
2. Verify all blocks have complete information
3. Test course navigation flow
4. Click "Publish"

### Course Versions

The platform supports versioning:

- Track changes to course structure
- Compare different versions
- Roll back to previous versions if needed
- View version history

## Best Practices

### Naming Conventions

- Use clear, descriptive block titles
- Be consistent with terminology
- Provide translations for all languages

### Course Structure

- Start with broad topics, drill down to specifics
- Limit depth to 3-4 levels for clarity
- Use prerequisites judiciously
- Group related content together

### Content Organization

- One concept per block
- Clear learning objectives for each block
- Link to external resources when appropriate
- Keep blocks focused and manageable

## Next Steps

More documentation coming soon on managing course content, analytics, and publishing best practices.
